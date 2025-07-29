"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase, UserContext } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SupabaseAICoach = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load user context and chat history
  useEffect(() => {
    if (user?.id) {
      loadUserContext();
      loadChatHistory();
    }
  }, [user?.id, loadUserContext, loadChatHistory]);

  const loadUserContext = useCallback(async () => {
    if (!user?.id) return;

    try {
      await supabase
        .from('user_contexts')
        .select('*')
        .eq('user_id', user.id)
        .single();
    } catch {
      console.log("No existing user context found");
    }
  }, [user?.id]);

  const loadChatHistory = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(10);

      if (data) {
        const chatMessages = data.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
          timestamp: new Date(msg.timestamp).getTime(),
        }));
        setMessages(chatMessages);
      }
    } catch {
      console.log("No chat history found");
    }
  }, [user?.id]);

  const saveMessage = async (message: Message) => {
    if (!user?.id) return;

    try {
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        session_id: sessionId,
        role: message.role,
        content: message.content,
        timestamp: new Date(message.timestamp).toISOString(),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const updateUserContext = async (updates: Partial<UserContext>) => {
    if (!user?.id) return;

    try {
      await supabase
        .from('user_contexts')
        .upsert({
          user_id: user.id,
          ...updates,
          last_updated: new Date().toISOString(),
        });
    } catch (error) {
      console.error("Error updating user context:", error);
    }
  };

  const extractInsights = async (userMessage: string) => {
    if (!user?.id) return;

    // Extract fitness goals
    const goalPatterns = [
      /want to (lose|gain|build|improve) (\w+)/gi,
      /goal is to (\w+)/gi,
      /trying to (\w+)/gi,
    ];
    
    for (const pattern of goalPatterns) {
      const matches = userMessage.match(pattern);
      if (matches) {
        await supabase.from('insights').insert({
          user_id: user.id,
          type: 'goal',
          content: matches[0],
          confidence: 0.8,
          extracted_from: sessionId,
        });
      }
    }

    // Extract fitness level
    if (userMessage.toLowerCase().includes("beginner") || 
        userMessage.toLowerCase().includes("new to")) {
      await updateUserContext({
        fitness_level: "beginner"
      });
    }

    // Extract equipment mentions
    const equipment = ["dumbbell", "barbell", "gym", "home", "bands", "kettlebell"];
    const mentioned = equipment.filter(e => userMessage.toLowerCase().includes(e));
    if (mentioned.length > 0) {
      await updateUserContext({
        preferences: {
          equipment: mentioned,
          workout_types: [],
          dietary_restrictions: [],
        }
      });
    }
  };

  const addToKnowledgeBase = async (topic: string, content: string) => {
    try {
      await supabase.from('knowledge_base').upsert({
        topic,
        content,
        category: 'fitness',
        confidence: 0.7,
        sources: [sessionId],
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding to knowledge base:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!user) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Please sign in to use the AI Coach. Click the Sign In button in the navigation bar.",
        timestamp: Date.now(),
      }]);
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    await saveMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const contextPrompt = `You are Adams Performance Coach, an elite fitness and performance expert. You appear as a powerful silver muscular figure with glowing blue energy. 

Previous conversation:
${messages.slice(-5).map(m => `${m.role}: ${m.content}`).join("\n")}

User: ${input}

Provide expert fitness coaching advice. Be encouraging, knowledgeable, and specific. Focus on helping the user achieve their fitness goals.`;

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(contextPrompt);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        role: "assistant",
        content: text,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);
      await saveMessage(aiMessage);

      // Extract insights and update knowledge
      await extractInsights(input);

      // Add to knowledge base if valuable fitness info
      if (text.includes("exercise") || text.includes("workout") || text.includes("nutrition")) {
        const topic = input.split(" ").slice(0, 5).join(" ");
        await addToKnowledgeBase(topic, text);
      }

    } catch (error: any) {
      console.error("Error:", error);
      
      const errorMessage = error.message?.includes("API_KEY_INVALID") 
        ? "There's an issue with the API configuration."
        : "I apologize, but I'm having trouble responding right now.";
      
      const errorMsg: Message = {
        role: "assistant",
        content: errorMessage,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, errorMsg]);
      await saveMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-card/90 backdrop-blur-sm border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-4">
        <div className="relative w-12 h-12">
          <img 
            src="/ai-coach-avatar.png" 
            alt="AI Coach"
            className="w-full h-full rounded-full object-cover border-2 border-primary"
            onError={(e) => {
              // Fallback to bot icon if image doesn't load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        </div>
        <div>
          <h3 className="font-bold text-lg">Adams Performance Coach</h3>
          <p className="text-sm text-muted-foreground">AI-powered fitness expert with memory</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-16 h-16 mx-auto text-primary mb-4" />
              <p className="text-muted-foreground mb-2">Welcome to Adams Performance Coaching!</p>
              <p className="text-sm text-muted-foreground">
                I remember our conversations and learn about your fitness journey.
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-secondary/20 text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-secondary/20 rounded-lg px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about workouts, nutrition, or fitness goals..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SupabaseAICoach;