#!/bin/bash

# Fix Clerk secret key issue for Netlify

echo "🔧 Fixing Clerk secret key configuration"
echo "======================================="

cd ~/Downloads/CoachApp

# Add both files
git add .env.production netlify.toml

# Commit
git commit -m "Fix Clerk secret key configuration for Netlify

- Added CLERK_SECRET as alternate variable name
- Added netlify.toml with build configuration
- Ensures secret key is available during build"

# Push to GitHub
git push origin main

echo ""
echo "✅ Fix pushed to GitHub!"
echo ""
echo "The Clerk secret key is now:"
echo "- In .env.production as CLERK_SECRET_KEY"
echo "- Also as CLERK_SECRET (alternate name)"
echo "- In netlify.toml for build environment"
echo ""
echo "Netlify should now build successfully!"
