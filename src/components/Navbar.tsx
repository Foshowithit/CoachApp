"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, ZapIcon, Bot, DollarSign, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1 bg-primary/10 rounded">
              <ZapIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg md:text-xl font-bold truncate">Adams Performance</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-5">
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

                <Link
                  href="/ai-coach"
                  className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                >
                  <Bot size={16} />
                  <span>AI Coach</span>
                </Link>

                <Link
                  href="/pricing"
                  className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                >
                  <DollarSign size={16} />
                  <span>Pricing</span>
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

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            {isSignedIn && <UserButton />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              {isSignedIn ? (
                <>
                  <Link
                    href="/"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <HomeIcon size={18} />
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/generate-program"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <DumbbellIcon size={18} />
                    <span>Generate Program</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon size={18} />
                    <span>Profile</span>
                  </Link>

                  <Link
                    href="/ai-coach"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Bot size={18} />
                    <span>AI Coach</span>
                  </Link>

                  <Link
                    href="/pricing"
                    className="flex items-center gap-3 text-sm hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <DollarSign size={18} />
                    <span>Pricing</span>
                  </Link>
                  
                  <Button
                    asChild
                    className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link 
                      href="/generate-program"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <SignInButton>
                    <Button
                      variant={"outline"}
                      className="border-primary/50 text-primary hover:text-white hover:bg-primary/10 w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </SignInButton>

                  <SignUpButton>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;
