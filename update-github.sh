#!/bin/bash

# Update GitHub with latest changes

echo "🚀 Updating GitHub with latest changes"
echo "====================================="

cd ~/Downloads/CoachApp

# Check current status
echo "📊 Checking git status..."
git status

# Add all changes
echo "📁 Adding all changes..."
git add .

# Create commit with detailed message
echo "💾 Creating commit..."
git commit -m "Fix branding issues and hero image

- Removed 'Get Strong' from page title
- Fixed navbar to show 'Adams Performance Coaching'
- Hidden CodeFlex text on hero image with overlay
- Added 'PERFORMANCE' badge to hero image
- Updated all branding elements throughout app"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo ""
echo "✅ GitHub updated successfully!"
echo ""
echo "Your changes are now live on GitHub at:"
echo "https://github.com/Foshowithit/CoachApp"
echo ""
echo "Ready for deployment on Vercel/Netlify!"
