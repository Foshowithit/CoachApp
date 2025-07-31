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
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY_MISSING");
      }
      
      const genAI = new GoogleGenerativeAI(apiKey);
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
      
      if (error.message?.includes("GEMINI_API_KEY_MISSING")) {
        errorMessage = "AI service is temporarily unavailable. Please try again later.";
      } else if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("400")) {
        errorMessage = "AI service is temporarily unavailable. Please try again later.";
      } else if (error.message?.includes("RATE_LIMIT_EXCEEDED") || error.message?.includes("429")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error.message?.includes("quota") || error.message?.includes("403")) {
        errorMessage = "AI service is temporarily unavailable due to high demand.";
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
    <div className="w-full h-full flex flex-col">
      {/* Mobile-optimized full-height chat container */}
      <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[600px] max-w-4xl mx-auto w-full bg-card/95 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
        
        {/* Compact Header */}
        <div className="p-3 md:p-4 border-b border-border flex items-center gap-3 bg-card/90 backdrop-blur-sm">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base md:text-lg truncate">Adams Performance Coach</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Your AI-powered fitness expert</p>
          </div>
        </div>

        {/* Messages - Optimized for mobile scrolling */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-background/50">
          <div className="space-y-4 md:space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-6 md:py-8">
                <Bot className="w-12 h-12 md:w-16 md:h-16 mx-auto text-primary mb-3 md:mb-4" />
                <p className="text-foreground mb-2 font-medium">Welcome to Performance Coaching!</p>
                <p className="text-sm text-muted-foreground px-4">
                  Ask me about workouts, nutrition, supplements, or any fitness goals.
                </p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 md:gap-3 ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-3 py-2 md:px-4 md:py-3 ${
                    message.role === "assistant"
                      ? "bg-secondary/30 text-foreground border border-border/50"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p className="text-xs opacity-60 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {message.role === "user" && (
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/90 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 md:gap-3 justify-start">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="bg-secondary/30 border border-border/50 rounded-2xl px-3 py-2 md:px-4 md:py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Enhanced Input Area */}
        <div className="p-3 md:p-4 border-t border-border bg-card/90 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2 md:gap-3"
          >
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about workouts, nutrition, or fitness..."
                disabled={isLoading}
                className="pr-10 py-3 md:py-2 text-base md:text-sm rounded-full border-border/50 bg-background/80 focus:bg-background transition-colors"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              size="sm"
              className="rounded-full px-4 py-3 md:py-2 bg-primary hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {/* Quick suggestions for mobile */}
          <div className="flex gap-2 mt-2 md:hidden overflow-x-auto pb-1">
            {["Workout plan", "Fat loss", "Build muscle", "Nutrition tips"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="flex-shrink-0 px-3 py-1 text-xs bg-secondary/30 hover:bg-secondary/50 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAICoach;