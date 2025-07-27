# Netlify Deployment Guide for Adams Performance Coaching

## Prerequisites
- GitHub repository pushed (CoachApp)
- Netlify account
- All API keys ready

## Deployment Steps

### 1. Connect to Netlify
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub
5. Select the `CoachApp` repository

### 2. Configure Build Settings
```
Build command: npm run build
Publish directory: .next
```

### 3. Environment Variables
Add these in Netlify dashboard (Site settings → Environment variables):

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id
NEXT_PUBLIC_VAPI_API_KEY=your_api_key

# Convex Database
CONVEX_DEPLOYMENT=your_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 4. Deploy
Click "Deploy site"

## Important Notes

### For Next.js on Netlify:
1. You may need to install `@netlify/plugin-nextjs` plugin
2. Add a `netlify.toml` file if needed:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_ENABLE_EXPERIMENTAL_TURBO = "false"
```

### Alternative: Deploy to Vercel (Recommended for Next.js)
Since this is a Next.js app, Vercel might be easier:

1. Go to [https://vercel.com](https://vercel.com)
2. Import GitHub repository
3. Auto-detects Next.js
4. Add environment variables
5. Deploy

## Post-Deployment

1. Update Clerk URLs:
   - Add your Netlify URL to Clerk allowed URLs
   - Update redirect URLs

2. Update Convex:
   - Add production URL to allowed origins

3. Test all features:
   - Authentication flow
   - Voice AI generation
   - Database connections

## Custom Domain
1. In Netlify: Domain settings → Add custom domain
2. Follow DNS configuration steps
3. Enable HTTPS (automatic)
