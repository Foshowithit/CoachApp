#!/bin/bash

# Remove the hero image and replace with a clean design

echo "🎨 Removing hero image..."
echo "========================"

cd ~/Downloads/CoachApp

# Update the page to remove the image
cat > src/app/page.tsx << 'EOF'
import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon, Activity, Brain, Target } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* CORNER DECARATION */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <div>
                  <span className="text-foreground">Transform</span>
                </div>
                <div>
                  <span className="text-primary">Your Body</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">With Advanced</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-primary"> Technology</span>
                </div>
              </h1>

              {/* SEPERATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

              <p className="text-xl text-muted-foreground w-2/3">
                Talk to our AI assistant and get personalized diet plans and workout routines
                designed just for you
              </p>

              {/* STATS */}
              <div className="flex items-center gap-10 py-6 font-mono">
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">500+</div>
                  <div className="text-xs uppercase tracking-wider">ACTIVE USERS</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">3min</div>
                  <div className="text-xs uppercase tracking-wider">GENERATION</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">100%</div>
                  <div className="text-xs uppercase tracking-wider">PERSONALIZED</div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
                >
                  <Link href={"/generate-program"} className="flex items-center font-mono">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE CONTENT - REPLACED WITH FEATURES */}
            <div className="lg:col-span-5 relative">
              <div className="space-y-6">
                {/* Feature Cards */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">AI-Powered</h3>
                      <p className="text-sm text-muted-foreground">Smart coaching that adapts to you</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Goal-Focused</h3>
                      <p className="text-sm text-muted-foreground">Customized plans for your objectives</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 transform hover:scale-105 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Performance Tracking</h3>
                      <p className="text-sm text-muted-foreground">Monitor your progress in real-time</p>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="text-center mt-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full border border-primary/30">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs text-primary uppercase tracking-wider">Adams Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserPrograms />
    </div>
  );
};
export default HomePage;
EOF

echo "✅ Hero image removed!"
echo ""
echo "Replaced with:"
echo "- Clean feature cards"
echo "- AI-Powered, Goal-Focused, Performance Tracking"
echo "- Adams Performance badge"
echo ""
echo "Refresh your browser to see the new design!"
