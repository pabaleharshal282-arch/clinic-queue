# Hospital Management System - Deployment Guide

## Quick Deploy Options

### Option 1: Render.com (Free, Recommended)

1. **Sign up** at [render.com](https://render.com)
2. **New → Web Service**
3. Connect your GitHub repo (or push backend folder)
4. **Settings:**
   - **Root Directory:** `backend` (if repo has frontend + backend)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Add `PORT` (auto-set by Render) - no extra vars needed

5. Deploy. Your API will live at `https://your-app-name.onrender.com`

**Note:** Free tier sleeps after 15 min of no traffic. First request may take ~30 seconds to wake.

---

### Option 2: Railway.app (Free)

1. Sign up at [railway.app](https://railway.app)
2. **New Project → Deploy from GitHub**
3. Select your repo, set root to `backend`
4. Railway auto-detects Node.js. Deploy.
5. Get your URL from the dashboard (e.g. `https://your-app.up.railway.app`)

---

### Option 3: Vercel (Serverless)

Requires converting to serverless. More setup. Use Render or Railway for simplicity.

---

## After Backend is Live

### Update Frontend API URL

1. Create `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
   (Replace with your actual backend URL - must end with `/api`)

2. **Build frontend:** `cd frontend && npm run build`

3. **Deploy frontend** to Vercel, Netlify, or GitHub Pages (see below).

### Deploy Frontend (Vercel - Free)

1. Sign up at [vercel.com](https://vercel.com)
2. **Import** your GitHub repo
3. **Root Directory:** `frontend`
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Environment Variable:** Add `VITE_API_URL` = your backend URL
7. Deploy

### CORS

The backend uses `app.use(cors())` which allows all origins. For production you can restrict:
- Add `origin: ['https://your-frontend.vercel.app']` in cors options.

---

## Environment Variables (Optional)

| Variable      | Description                    | Default                      |
|---------------|--------------------------------|------------------------------|
| PORT          | Server port                    | 5000 (platform sets this)    |
| MONGODB_URI   | MongoDB connection (optional)  | In-memory used if not set    |
| NODE_ENV      | `production` in production     | -                            |

---

## Checklist

- [ ] Backend deployed (Render/Railway)
- [ ] API URL works: `https://your-api.onrender.com/` returns JSON
- [ ] Frontend `.env.production` has `VITE_API_URL`
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Test full flow (login, queue, doctors)
