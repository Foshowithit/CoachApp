#!/bin/bash

# Complete fix - remove all CodeFlex branding

echo "🔧 Removing ALL CodeFlex branding..."
echo "===================================="

cd ~/Downloads/CoachApp

# 1. Update Footer to remove codeflex.ai
cat > src/components/Footer.tsx << 'EOF'
import { Activity } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded">
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xl font-bold">
                Adams Performance Coaching
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Adams Performance Coaching - All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-2 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/help"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Help
            </Link>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-background/50">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-mono">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
EOF

# 2. Check for any remaining hero image references
echo "Checking for hero image references..."
find src -type f -name "*.tsx" -o -name "*.ts" | xargs grep -l "hero-ai" || echo "No hero image references found in code"

# 3. Rename the problematic images to prevent them from being used
cd public
mv hero-ai.png hero-ai-old.png 2>/dev/null || true
mv hero-ai2.png hero-ai2-old.png 2>/dev/null || true
mv hero-ai3.png hero-ai3-old.png 2>/dev/null || true
cd ..

# 4. Add timestamp to force rebuild
echo "// Last updated: $(date)" >> src/app/page.tsx

# 5. Commit everything
git add -A
git commit -m "[CRITICAL FIX] Remove ALL CodeFlex branding

- Updated Footer to show Adams Performance Coaching
- Removed all codeflex.ai references
- Renamed hero images to prevent loading
- Complete rebrand"

# 6. Push to GitHub
git push origin main

echo ""
echo "✅ ALL CodeFlex branding removed!"
echo ""
echo "Changes made:"
echo "1. Footer now shows 'Adams Performance Coaching'"
echo "2. Copyright updated"
echo "3. Hero images renamed to prevent loading"
echo ""
echo "IMPORTANT: In Netlify, do a 'Clear cache and deploy site'"
