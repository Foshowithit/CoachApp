#!/bin/bash

# Fix the hero image CodeFlex text with better positioning

echo "🎨 Fixing hero image overlay positioning..."
echo "========================================"

cd ~/Downloads/CoachApp

# Update the page with better positioned overlay
sed -i '' 's/<div className="absolute bottom-\[20%\]/<div className="absolute bottom-\[25%\]/g' src/app/page.tsx
sed -i '' 's/w-32 h-14/w-40 h-16/g' src/app/page.tsx
sed -i '' 's/bg-background\/95/bg-background/g' src/app/page.tsx

echo "✅ Overlay positioning adjusted!"
echo ""
echo "The overlay is now:"
echo "- Positioned higher (25% from bottom)"
echo "- Wider and taller (w-40 h-16)"
echo "- Fully opaque background color"
echo ""
echo "Refresh your browser and do a hard refresh (Cmd+Shift+R) to see the changes!"
