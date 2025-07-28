#!/bin/bash

# Move the muscle figure image to the project

echo "🎨 Adding hero athlete image to CoachApp..."
echo "========================================="

cd ~/Downloads/CoachApp

# Copy the image to the public folder with the correct name
cp ~/Downloads/"Untitled design (52).png" public/hero-athlete.png

echo "✅ Image copied to public/hero-athlete.png"

# Add and commit
git add public/hero-athlete.png
git add src/app/page.tsx
git commit -m "Add professional hero athlete image

- Added muscular figure as hero-athlete.png
- Replaces CodeFlex branded images
- Professional fitness branding complete"

# Push to GitHub
git push origin main

echo ""
echo "🎉 SUCCESS! Hero image added and pushed!"
echo ""
echo "The site will now show:"
echo "- Your professional muscle figure"
echo "- With cyberpunk effects overlay"
echo "- 'Adams Performance' badge"
echo "- No CodeFlex branding!"
echo ""
echo "Netlify will auto-deploy in 1-2 minutes!"
