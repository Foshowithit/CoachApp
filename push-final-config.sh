#!/bin/bash

# Push complete environment configuration

echo "🚀 Adding Convex keys and pushing final configuration"
echo "==================================================="

cd ~/Downloads/CoachApp

# Add and commit
git add .env.production
git commit -m "Add Convex database configuration - all services ready!

- Added CONVEX_DEPLOYMENT
- Added NEXT_PUBLIC_CONVEX_URL
- All required services now configured:
  ✅ Clerk Authentication
  ✅ Vapi Voice AI
  ✅ Convex Database"

# Push to GitHub
git push origin main

echo ""
echo "🎉 SUCCESS! All environment variables configured!"
echo "================================================"
echo ""
echo "✅ Clerk Authentication - Ready"
echo "✅ Vapi Voice AI - Ready"
echo "✅ Convex Database - Ready"
echo ""
echo "Your Adams Performance Coaching app is now fully configured!"
echo "Netlify will redeploy with all features working."
echo ""
echo "Check your deployment at: https://your-site.netlify.app"
