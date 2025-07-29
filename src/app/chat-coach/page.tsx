"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const ChatCoachPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const { user } = useUser();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = {
        role: "assistant" as const,
        content: `Hello ${user?.firstName || "there"}! I'm your Adams Performance Coach. I'm here to help create a personalized fitness program just for you. Let's start with some questions:\n\n1. What are your main fitness goals? (e.g., build muscle, lose weight, improve endurance)\n2. How many days per week can you work out?\n3. Do you have any injuries or limitations I should know about?\n4. What's your current fitness level?\n\nFeel free to answer these one by one!`,
        timestamp: Date.now(),
      };
      setMessages([greeting]);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI call later)
    setTimeout(() => {
      const responses = [
        "Great! That helps me understand your goals better. Can you tell me more about your current workout routine?",
        "Excellent information! Based on what you've shared, I'm starting to formulate a program that will work well for you.",
        "Perfect! I'm getting a clear picture of what will work best for you. Let me ask about your nutrition preferences...",
        "Outstanding! I think I have enough information to create your personalized program. Let me generate that for you now...",
      ];

      const responseIndex = Math.min(messages.length / 2, responses.length - 1);
      let responseContent = responses[responseIndex];

      // If this is the final response, create the program
      if (responseIndex === responses.length - 1) {
        responseContent = `Perfect! I've created your personalized Adams Performance Program. Here's what I've designed for you:

**WORKOUT PLAN:**
• 4 days per week training schedule
• Upper/Lower body split
• Progressive overload system
• Compound movements focus

**NUTRITION GUIDELINES:**
• Calculated macros for your goals
• Meal timing recommendations
• Supplement suggestions

Your complete program is now being saved to your profile. You'll be redirected there in a moment to view all the details!`;
        
        setTimeout(() => {
          setSessionComplete(true);
          setTimeout(() => router.push("/profile"), 2000);
        }, 3000);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span>Chat with Your </span>
            <span className="text-primary uppercase">Performance Coach</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a conversation to create your personalized fitness program
          </p>
        </div>

        {/* Coach Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center overflow-hidden">
              <img
                src="/dark-muscle-figure.webp"
                alt="Adams Performance Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="bg-card/90 backdrop-blur-sm border border-border mb-6 h-96 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {sessionComplete && (
                <div className="flex justify-center">
                  <div className="bg-green-600 text-white p-3 rounded-lg text-center">
                    <p>✅ Program created! Redirecting to your profile...</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </Card>

        {/* Input Form */}
        {!sessionComplete && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 p-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6"
            >
              Send
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatCoachPage;