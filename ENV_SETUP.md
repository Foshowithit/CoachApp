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
