#!/bin/bash

# Push the production environment variables to GitHub

echo "🚀 Pushing production environment variables to GitHub"
echo "==================================================="

cd ~/Downloads/CoachApp

# Add the .env.production file
git add .env.production

# Commit with a clear message
git commit -m "Add Clerk production keys for Netlify deployment

- Added NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- Added CLERK_SECRET_KEY
- Ready for Netlify deployment"

# Push to GitHub
git push origin main

echo ""
echo "✅ Success! Production keys pushed to GitHub"
echo ""
echo "Netlify should automatically redeploy with these keys."
echo "Check your Netlify dashboard in a few minutes!"
echo ""
echo "Note: You still need to add Vapi and Convex keys if you want"
echo "the voice AI and database features to work in production."
