# 🚀 Deployment Guide

## Quick Deploy (15 minutes)

### Step 1: Create GitHub Account
1. Go to https://github.com
2. Click "Sign Up"
3. Use email: `yori03763@gmail.com`
4. Choose username (e.g., `formfab-team`)
5. Verify email
6. Done!

### Step 2: Create Repository
```bash
# In your project folder
cd ~/.openclaw/workspace/projects/formfab

# Initialize git (if not done)
git init

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/formfab.git

# Commit everything
git add -A
git commit -m "Initial commit - FormFab ready for deployment"

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import `formfab` repo
5. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-key
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
6. Click "Deploy"
7. Done! Frontend is live

### Step 4: Deploy Backend (Railway)
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select `formfab` repo
5. Select `backend` as root
6. Add environment variables:
   ```
   PORT=3002
   MESHY_API_KEY=your-key
   SUPABASE_URL=your-url
   SUPABASE_KEY=your-key
   ```
7. Click "Deploy"
8. Done! Backend is live

### Step 5: Set Up Supabase
1. Go to https://supabase.com
2. Sign up with GitHub
3. Create new project
4. Copy URL and Anon Key
5. Add to both Vercel and Railway

### Step 6: Set Up Stripe
1. Go to https://stripe.com
2. Sign up with GitHub
3. Get API keys (test mode)
4. Add to Vercel and Railway

---

## ✅ Post-Deployment Checklist

- [ ] Test login/signup
- [ ] Test 3D generation
- [ ] Test checkout flow
- [ ] Test WebSocket progress
- [ ] Update API URL in frontend
- [ ] Enable production mode
- [ ] Set up custom domain (optional)

---

## 🔧 Troubleshooting

### Frontend not connecting to backend
```bash
# Check API URL in .env.local
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### Auth not working
```bash
# Check Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### WebSocket failing
```bash
# Backend must allow CORS
# Check backend/src/index.ts
fastify.register(cors, { origin: true })
```

---

## 📊 Monitoring

### Vercel Dashboard
- https://vercel.com/dashboard
- View logs
- Check performance

### Railway Dashboard
- https://railway.app/dashboard
- View logs
- Check resource usage

---

## 🎉 You're Live!

Once deployed, your app will be accessible at:
- Frontend: `https://formfab.vercel.app`
- Backend: `https://formfab-backend.railway.app`

Share with the world! 🚀
