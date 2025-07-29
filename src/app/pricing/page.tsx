"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Calendar, MessageCircle, Video, Coins } from "lucide-react";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "weekly",
      name: "Weekly Calls",
      price: "$425",
      duration: "per month",
      description: "Maximum support with weekly video consultations",
      features: [
        "Weekly 45-minute video calls",
        "24/7 messaging support",
        "Customized training plans - Tailored to optimize hypertrophy and leanness",
        "Customized nutrition plans - Macro-optimized for your goals",
        "Guidance on improving body aesthetics, height and frame",
        "Everything I know about improving looks",
        "Hormone/PED optimization - Advanced protocols",
        "Weekly progress reviews and adjustments"
      ],
      popular: false,
      buttonText: "Start Weekly Coaching",
    },
    {
      id: "monthly",
      name: "Monthly Calls", 
      price: "$349",
      duration: "per month",
      description: "Balanced approach with monthly check-ins",
      features: [
        "Monthly 60-minute video calls",
        "24/7 messaging support",
        "Customized training plans - Tailored to optimize hypertrophy and leanness",
        "Customized nutrition plans - Macro-optimized for your goals",
        "Guidance on improving body aesthetics, height and frame",
        "Everything I know about improving looks",
        "Hormone/PED optimization - Advanced protocols",
        "Monthly progress reviews and adjustments"
      ],
      popular: true,
      buttonText: "Start Monthly Coaching",
    },
    {
      id: "messaging",
      name: "No Calls",
      price: "$299",
      duration: "per month", 
      description: "Full support through messaging and customized plans",
      features: [
        "24/7 messaging support",
        "Customized training plans - Tailored to optimize hypertrophy and leanness",
        "Customized nutrition plans - Macro-optimized for your goals",
        "Guidance on improving body aesthetics, height and frame",
        "Everything I know about improving looks",
        "Hormone/PED optimization - Advanced protocols",
        "Weekly written check-ins and adjustments",
        "All the same protocols and guidance, just no video calls"
      ],
      popular: false,
      buttonText: "Start Messaging Coaching",
    }
  ];

  const bulkPricing = {
    "3 month": {
      discount: "20% off",
      weekly: "$1,020",
      monthly: "$838", 
      messaging: "$718"
    },
    "6 month": {
      discount: "30% off",
      weekly: "$1,785",
      monthly: "$1,466",
      messaging: "$1,256"
    }
  };


  return (
    <div className="min-h-screen pt-24 pb-12 relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
        <div className="absolute inset-0 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-primary">💎 Private Coaching 💎</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              I&apos;ve had a lot of coaching inquiries lately so I&apos;d like to make a public announcement regarding coaching. 
              Obviously I provide plenty of resources for you to learn how to transform yourself, but for people who want 
              more personalized advice and more 1-on-1 time spent with me helping them plan their ascension, this is for you.
            </p>
          </div>

          {/* Academy Section */}
          <div className="mb-16">
            <Card className="p-8 bg-primary/5 border-primary/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="text-primary">Performance Coaching Academy</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Join Performance Coaching Academy to get access to:
                </p>
                <ul className="text-left max-w-2xl mx-auto space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>An AI expert assistant for training, nutrition, hormones and overall health development / lifestyle development - giving you the complete blueprint to transform yourself.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Private community</span>
                  </li>
                </ul>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => window.open('https://whop.com/androgenic', '_blank')}
                >
                  Join Academy Now
                </Button>
              </div>
            </Card>
          </div>

          {/* Private Coaching Plans */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              <span className="text-foreground">Or Get</span>{" "}
              <span className="text-primary">1-on-1 Private Coaching</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              For those who want personalized attention and direct access to me
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative p-8 transition-all duration-300 hover:border-primary/50 ${
                  plan.popular ? "border-primary/50 scale-105" : ""
                } ${
                  selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => {
                    // Handle booking/payment logic here
                    console.log(`Selected plan: ${plan.id}`);
                  }}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>

          {/* Crypto Payment Alternative */}
          <div className="mb-16">
            <Card className="p-8 bg-secondary/10 border-secondary/30">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Coins className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">
                    <span className="text-primary">Payment Alternative: Crypto</span>
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  I provide larger discounts for bulk packages if paid through crypto (I accept almost any crypto).
                  DM me if you&apos;re considering this.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(bulkPricing).map(([duration, pricing]) => (
                  <Card key={duration} className="p-6 bg-background/50">
                    <h3 className="text-xl font-bold mb-2 capitalize">
                      {duration} subscription ({pricing.discount})
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Weekly calls:</span>
                        <span className="font-bold text-primary">{pricing.weekly}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Monthly calls:</span>
                        <span className="font-bold text-primary">{pricing.monthly}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">No calls:</span>
                        <span className="font-bold text-primary">{pricing.messaging}</span>
                      </li>
                    </ul>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* What You Get */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-foreground">What Makes This</span>{" "}
              <span className="text-primary">Different</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Evidence-Based Approach</h3>
                <p className="text-sm text-muted-foreground">
                  No bro-science. Every recommendation is backed by research and real-world results with advanced protocols.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Hormone Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced knowledge of TRT, natural optimization, and comprehensive hormone health protocols.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Technical Background</h3>
                <p className="text-sm text-muted-foreground">
                  Software developer turned coach - I understand systems, data, and optimization at a deeper level.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Flexible Protocols</h3>
                <p className="text-sm text-muted-foreground">
                  Customized approaches based on your lifestyle, goals, and unique physiological responses.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Advanced Supplementation</h3>
                <p className="text-sm text-muted-foreground">
                  Access to cutting-edge compounds and protocols most coaches don&apos;t know about or understand.
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Real-World Results</h3>
                <p className="text-sm text-muted-foreground">
                  Proven track record with clients achieving dramatic transformations and competition success.
                </p>
              </Card>
            </div>
          </div>


          {/* CTA Section */}
          <Card className="p-8 text-center bg-primary/5 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Physique?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop spinning your wheels with generic advice. Get a customized approach that actually works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book Free Discovery Call
              </Button>
              <Button size="lg" variant="outline">
                View Success Stories
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;