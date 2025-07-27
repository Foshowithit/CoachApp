#!/bin/bash

# Push CoachApp to GitHub

echo "🚀 Pushing CoachApp to GitHub"
echo "============================="

cd ~/Downloads/CoachApp

# 1. Check git status
echo "📊 Checking git status..."
git status

# 2. Add all files
echo "📁 Adding all files to git..."
git add .

# 3. Create commit
echo "💾 Creating commit..."
git commit -m "Complete Adams Performance Coaching app with enhanced fitness coach

- Rebranded from CodeFlex to Adams Performance Coaching
- Added compound knowledge system
- Enhanced Convex schema for future features
- Professional fitness coaching platform ready for deployment"

# 4. Set remote origin (if not already set)
echo "🔗 Setting remote origin..."
git remote add origin https://github.com/Foshowithit/CoachApp.git 2>/dev/null || echo "Remote already exists"

# 5. Push to main branch
echo "⬆️ Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "Next steps for Netlify deployment:"
echo "1. Go to https://app.netlify.com"
echo "2. Click 'Add new site' > 'Import an existing project'"
echo "3. Choose GitHub and select 'CoachApp' repository"
echo "4. Configure build settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: .next"
echo "5. Add environment variables from your .env.local"
