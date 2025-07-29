"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getKnowledgeBasePrompt } from "@/lib/knowledge-base-expanded";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SimpleAICoach = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Initialize Gemini with your API key
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Build context with conversation history
      const conversationContext = messages.slice(-5).map(m => `${m.role}: ${m.content}`).join("\n");
      const promptWithHistory = `${input}\n\nPrevious conversation:\n${conversationContext}`;
      
      const prompt = getKnowledgeBasePrompt(promptWithHistory);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        role: "assistant",
        content: text,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error: any) {
      console.error("Error:", error);
      
      let errorMessage = "I apologize, but I'm having trouble responding right now.";
      
      if (error.message?.includes("API_KEY_INVALID")) {
        errorMessage = "There's an issue with the API configuration. Please try again later.";
      } else if (error.message?.includes("RATE_LIMIT_EXCEEDED")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
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
          <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        </div>
        <div>
          <h3 className="font-bold text-lg">Adams Performance Coach</h3>
          <p className="text-sm text-muted-foreground">Your AI-powered fitness expert</p>
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
                Ask me anything about workouts, nutrition, or fitness goals.
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

export default SimpleAICoach;