"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const AICoachChat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Convex hooks
  const saveMessage = useMutation(api.aiCoach.saveChatMessage);
  const updateContext = useMutation(api.aiCoach.updateUserContext);
  const addKnowledge = useMutation(api.aiCoach.addKnowledge);
  const addInsight = useMutation(api.aiCoach.addInsight);
  
  const userContext = useQuery(api.aiCoach.getUserContext, { 
    userId: user?.id || "" 
  });
  const chatHistory = useQuery(api.aiCoach.getChatHistory, { 
    userId: user?.id || "",
    sessionId 
  });

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  
  // Check if API key is present
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error("Gemini API key is missing!");
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Load chat history
  useEffect(() => {
    if (chatHistory && chatHistory.length > 0) {
      const latestChat = chatHistory[0];
      setMessages(latestChat.messages);
    }
  }, [chatHistory]);

  const extractInsights = async (userMessage: string) => {
    // Extract fitness goals
    const goalPatterns = [
      /want to (lose|gain|build|improve) (\w+)/gi,
      /goal is to (\w+)/gi,
      /trying to (\w+)/gi,
    ];
    
    for (const pattern of goalPatterns) {
      const matches = userMessage.match(pattern);
      if (matches) {
        await addInsight({
          userId: user?.id || "",
          type: "goal",
          content: matches[0],
          confidence: 0.8,
          extractedFrom: sessionId,
        });
      }
    }

    // Extract fitness level indicators
    if (userMessage.toLowerCase().includes("beginner") || 
        userMessage.toLowerCase().includes("new to")) {
      await updateContext({
        userId: user?.id || "",
        updates: { fitnessLevel: "beginner" },
      });
    }

    // Extract equipment mentions
    const equipment = ["dumbbell", "barbell", "gym", "home", "bands", "kettlebell"];
    const mentioned = equipment.filter(e => userMessage.toLowerCase().includes(e));
    if (mentioned.length > 0) {
      await updateContext({
        userId: user?.id || "",
        updates: { 
          preferences: {
            equipment: mentioned,
            workoutTypes: [],
            dietaryRestrictions: [],
          }
        },
      });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Check if user is authenticated
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
    setInput("");
    setIsLoading(true);

    try {
      // Build context for AI
      const contextPrompt = `You are Adams Performance Coach, an elite fitness and performance expert with the appearance of a powerful silver muscular figure with glowing blue energy. You have accumulated knowledge from thousands of fitness conversations and continuously learn from each interaction.

User Context:
${userContext ? `
- Fitness Level: ${userContext.fitnessLevel}
- Goals: ${userContext.goals.join(", ")}
- Equipment: ${userContext.preferences.equipment.join(", ")}
- Current Weight: ${userContext.currentMetrics.weight || "Not specified"}
` : "New user - gather information about their fitness goals and experience."}

Previous Messages in Session:
${messages.slice(-5).map(m => `${m.role}: ${m.content}`).join("\n")}

User: ${input}

Provide expert fitness coaching advice. Be encouraging, knowledgeable, and specific. If you learn new information about the user, remember it for future conversations. Always maintain the persona of a powerful, wise fitness coach who cares about their progress.`;

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(contextPrompt);
      const response = await result.response;
      const aiMessage: Message = {
        role: "assistant",
        content: response.text(),
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save to database
      await saveMessage({
        userId: user.id,
        sessionId,
        messages: [userMessage, aiMessage],
      });

      // Extract insights and update knowledge
      await extractInsights(input);

      // Add to knowledge base if the response contains valuable fitness info
      if (response.text().includes("exercise") || 
          response.text().includes("workout") || 
          response.text().includes("nutrition")) {
        const topic = input.split(" ").slice(0, 5).join(" ");
        await addKnowledge({
          topic,
          content: response.text(),
          category: "fitness",
          confidence: 0.7,
          source: sessionId,
        });
      }

    } catch (error: any) {
      console.error("Error sending message:", error);
      
      let errorMessage = "I apologize, but I&apos;m having trouble connecting right now.";
      
      if (error.message?.includes("API key")) {
        errorMessage = "The Gemini API key appears to be invalid. Please check the configuration.";
      } else if (error.message?.includes("quota")) {
        errorMessage = "API quota exceeded. Please try again later.";
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      }
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMessage,
        timestamp: Date.now(),
      }]);
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
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        </div>
        <div>
          <h3 className="font-bold text-lg">Adams Performance Coach</h3>
          <p className="text-sm text-muted-foreground">Your AI-powered fitness expert</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-16 h-16 mx-auto text-primary mb-4" />
              <p className="text-muted-foreground mb-2">Welcome to Adams Performance Coaching!</p>
              <p className="text-sm text-muted-foreground">
                I&apos;m here to help you achieve your fitness goals. Ask me anything about workouts, nutrition, or recovery.
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
        </div>
      </ScrollArea>

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

export default AICoachChat;