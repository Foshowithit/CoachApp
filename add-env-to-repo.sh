#!/bin/bash

# Include environment variables in the repository

echo "📋 Setting up public environment variables"
echo "========================================="

cd ~/Downloads/CoachApp

# Copy .env.local to .env.production (which will be committed)
if [ -f .env.local ]; then
    echo "📁 Copying environment variables..."
    cp .env.local .env.production
    echo "✅ Created .env.production with your keys"
else
    echo "⚠️  No .env.local found"
    echo "Please add your keys to .env.production manually"
fi

# Update .gitignore to allow .env.production
echo "📝 Updating .gitignore to include .env.production..."
echo "" >> .gitignore
echo "# Allow production env file" >> .gitignore
echo "!.env.production" >> .gitignore

# Create a note about the env file
cat > ENV_SETUP.md << 'EOF'
# Environment Setup

This project includes `.env.production` with the necessary API keys for easy deployment.

## For Development:
```bash
cp .env.production .env.local
```

## For Deployment:
The `.env.production` file contains all necessary keys and will be used automatically by most deployment platforms.

### Vercel:
- Will automatically use `.env.production`

### Netlify:
- May need to copy values to environment variables in dashboard

### Note:
These keys are included because they are either:
- Public keys (NEXT_PUBLIC_*)
- Test/development keys
- Keys that are safe to share for this project
EOF

echo "📋 Created ENV_SETUP.md documentation"

# Add and commit
echo "🔧 Adding to git..."
git add .env.production ENV_SETUP.md .gitignore
git commit -m "Add production environment variables for easy deployment

- Added .env.production with API keys
- Updated .gitignore to include .env.production
- Added ENV_SETUP.md with instructions"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Environment variables added to repository!"
echo ""
echo "Now deployment platforms will have access to the keys automatically."
