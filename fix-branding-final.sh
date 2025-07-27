#!/bin/bash

# Fix remaining branding issues

echo "🔧 Fixing remaining branding issues..."
echo "===================================="

cd ~/Downloads/CoachApp

# 1. Update layout.tsx - Remove "Get Strong"
echo "📝 Updating layout title..."
sed -i '' 's/Adams Performance Coaching - Get Strong/Adams Performance Coaching/g' src/app/layout.tsx

# 2. Update Navbar.tsx - Replace codeflex.ai with Adams Performance Coaching
echo "📝 Updating Navbar..."
cat > src/components/Navbar.tsx << 'EOF'
"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded">
            <ZapIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold">Adams Performance Coaching</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-5">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>

              <Link
                href="/generate-program"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <DumbbellIcon size={16} />
                <span>Generate</span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
              >
                <UserIcon size={16} />
                <span>Profile</span>
              </Link>
              <Button
                asChild
                variant="outline"
                className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary/10"
              >
                <Link href="/generate-program">Get Started</Link>
              </Button>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant={"outline"}
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary/10"
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
EOF

echo "✅ Branding fixes complete!"
echo ""
echo "Changes made:"
echo "1. Removed 'Get Strong' from page title"
echo "2. Changed 'codeflex.ai' to 'Adams Performance Coaching' in navbar"
echo ""
echo "Please refresh your browser to see the changes!"
