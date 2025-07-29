"use client";

import SimpleAICoach from "@/components/SimpleAICoach";
import { motion } from "framer-motion";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

const AICoachPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      {/* Background Image with Dark Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/ai-coach-avatar.png" 
          alt="AI Coach Background"
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-background/90"></div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background"></div>
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent animate-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">AI-Powered</span>{" "}
            <span className="text-primary">Performance Coach</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized fitness guidance from an AI that learns and grows with every conversation
          </p>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Adaptive Learning</h3>
            <p className="text-sm text-muted-foreground">
              Remembers your goals and preferences
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Instant Advice</h3>
            <p className="text-sm text-muted-foreground">
              Get expert guidance 24/7
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Goal Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitors your progress over time
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Continuous Growth</h3>
            <p className="text-sm text-muted-foreground">
              Becomes smarter with each chat
            </p>
          </div>
        </motion.div>

        {/* Chat Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <SimpleAICoach />
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default AICoachPage;