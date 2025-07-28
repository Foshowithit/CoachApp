#!/bin/bash

# Help find and copy the actual API keys

echo "🔍 Looking for your API keys..."
echo "==============================="

cd ~/Downloads/CoachApp

# Check if .env.local exists and has keys
if [ -f .env.local ]; then
    echo "📋 Found .env.local"
    echo ""
    echo "Checking for keys..."
    
    # Check for Clerk key pattern
    if grep -q "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_" .env.local; then
        echo "✅ Found Clerk publishable key"
        
        # Copy to .env.production
        cp .env.local .env.production
        echo "✅ Copied keys to .env.production"
        
        # Commit and push
        git add .env.production
        git commit -m "Add production environment variables for Netlify deployment"
        git push origin main
        
        echo ""
        echo "✅ Success! Keys added and pushed to GitHub"
        echo "Netlify should now be able to deploy successfully!"
    else
        echo "⚠️  .env.local exists but doesn't contain valid Clerk keys"
        echo ""
        echo "You need to:"
        echo "1. Open .env.local and add your actual keys"
        echo "2. Run this script again"
    fi
else
    echo "❌ No .env.local found!"
    echo ""
    echo "To fix this:"
    echo "1. Create .env.local with your actual keys"
    echo "2. Or manually edit .env.production with your keys"
    echo "3. Then push to GitHub"
fi

echo ""
echo "📝 If you need to manually add keys, edit .env.production and add:"
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... (your actual key)"
echo "CLERK_SECRET_KEY=sk_test_... (your actual key)"
echo ""
echo "Get your Clerk keys from: https://dashboard.clerk.com/last-active?path=api-keys"
