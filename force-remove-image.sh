#!/bin/bash

# Force remove the image and clear any caches

echo "🔧 Forcing removal of CodeFlex image..."
echo "======================================"

cd ~/Downloads/CoachApp

# Make sure we're on the latest
git pull origin main

# Double-check the page.tsx doesn't have the image
if grep -q "hero-ai" src/app/page.tsx; then
    echo "⚠️  Found hero image reference! Removing..."
    # Remove any hero image references
    sed -i '' '/hero-ai/d' src/app/page.tsx
fi

# Add a comment to force a change
echo "" >> src/app/page.tsx
echo "// Updated: $(date)" >> src/app/page.tsx

# Commit with force rebuild message
git add -A
git commit -m "[FORCE REBUILD] Remove CodeFlex image completely

- Ensure no hero image with CodeFlex text
- Force Netlify to rebuild without cache
- Clean deployment"

# Push
git push origin main

echo ""
echo "✅ Pushed with force rebuild"
echo ""
echo "Now in Netlify:"
echo "1. Go to Deploys"
echo "2. Click 'Trigger deploy'"
echo "3. Select 'Clear cache and deploy site'"
echo ""
echo "This will force a complete rebuild without any cached images."
