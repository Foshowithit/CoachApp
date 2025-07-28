#!/bin/bash

# Fix Netlify deployment by ensuring environment variables are set

echo "🔧 Fixing Netlify deployment issue..."
echo "===================================="

cd ~/Downloads/CoachApp

# First, let's check if .env.local has actual values
if [ -f .env.local ]; then
    echo "📋 Checking .env.local for values..."
    
    # Copy .env.local to .env.production with actual values
    cp .env.local .env.production
    
    # Check if the file has actual keys
    if grep -q "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_" .env.production; then
        echo "✅ Found Clerk keys in .env.local"
    else
        echo "⚠️  No valid Clerk keys found in .env.local"
        echo ""
        echo "You need to add your actual Clerk keys to .env.production"
        echo "Get them from: https://dashboard.clerk.com/last-active?path=api-keys"
    fi
else
    echo "❌ No .env.local file found!"
    echo "Please create .env.production with your actual API keys"
fi

# Show what needs to be in .env.production
echo ""
echo "📝 Your .env.production file should look like this:"
echo "=================================================="
cat << 'EOF'
# Clerk Authentication (REQUIRED for deployment)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_actual_workflow_id
NEXT_PUBLIC_VAPI_API_KEY=your_actual_api_key

# Convex Database
CONVEX_DEPLOYMENT=your_actual_deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
EOF

echo ""
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Add your actual API keys to .env.production"
echo "2. Commit and push: git add . && git commit -m 'Add production env' && git push"
echo "3. Redeploy on Netlify"
