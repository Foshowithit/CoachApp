#!/bin/bash

# Push updated environment variables with Vapi keys

echo "🚀 Adding Vapi keys and pushing to GitHub"
echo "========================================"

cd ~/Downloads/CoachApp

# Add and commit
git add .env.production
git commit -m "Add Vapi API keys for voice coach functionality

- Added NEXT_PUBLIC_VAPI_WORKFLOW_ID
- Added NEXT_PUBLIC_VAPI_API_KEY
- Voice AI coach now ready for production"

# Push to GitHub
git push origin main

echo ""
echo "✅ Success! Vapi keys added and pushed"
echo ""
echo "Your app now has:"
echo "✅ Clerk authentication"
echo "✅ Vapi voice AI"
echo "⚠️  Still need Convex keys for database"
echo ""
echo "Netlify will redeploy automatically!"
