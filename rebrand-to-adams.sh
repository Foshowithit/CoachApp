#!/bin/bash

# Script to rebrand CodeFlex to Adams Performance Coaching

echo "🏋️ Rebranding to Adams Performance Coaching..."
echo "============================================"

cd ~/Downloads/CoachApp

# Update layout.tsx
echo "📝 Updating layout.tsx..."
sed -i '' 's/CodeFlex AI - Get Jacked/Adams Performance Coaching - Get Strong/g' src/app/layout.tsx
sed -i '' 's/A modern fitness AI platform to get jacked for free./Professional fitness coaching and performance optimization platform./g' src/app/layout.tsx

# Update package.json
echo "📝 Updating package.json..."
sed -i '' 's/"name": "codeflex"/"name": "adams-performance-coaching"/g' package.json

# Update Navbar.tsx
echo "📝 Updating Navbar..."
sed -i '' 's/codeflex\.ai/Adams Performance Coaching/g' src/components/Navbar.tsx

# Update generate-program page
echo "📝 Updating generate-program page..."
sed -i '' 's/CodeFlex AI/Adams Performance Coach/g' src/app/generate-program/page.tsx
sed -i '' 's/Fitness & Diet Coach/Fitness \& Performance Expert/g' src/app/generate-program/page.tsx
sed -i '' 's/"CodeFlex AI"/"Adams Coach"/g' src/app/generate-program/page.tsx

# Update home page
echo "📝 Updating home page..."
if [ -f src/app/page.tsx ]; then
    # Look for main headings and update them
    sed -i '' 's/CodeFlex AI/Adams Performance Coaching/g' src/app/page.tsx
    sed -i '' 's/Get Jacked/Get Strong/g' src/app/page.tsx
fi

# Update Footer.tsx if it exists
if [ -f src/components/Footer.tsx ]; then
    echo "📝 Updating Footer..."
    sed -i '' 's/CodeFlex AI/Adams Performance Coaching/g' src/components/Footer.tsx
fi

# Update README
echo "📝 Updating README..."
sed -i '' 's/CoachApp/Adams Performance Coaching/g' README.md
sed -i '' 's/An enhanced AI fitness coach/Professional performance coaching platform/g' README.md

echo "✅ Rebranding complete!"
echo ""
echo "Next steps:"
echo "1. Restart your dev server (Ctrl+C and npm run dev)"
echo "2. Clear browser cache if needed"
echo "3. Check all pages to ensure branding is updated"
