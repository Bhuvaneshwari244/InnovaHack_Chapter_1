# Deployment Guide

## Quick Deploy (Production Ready)

### Backend Deployment (Render.com - FREE)

1. **Create account on Render.com**
2. **Create New Web Service**
   - Connect your GitHub repo
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Add to requirements.txt: `gunicorn==21.2.0`

3. **Environment Variables**
   - No special variables needed for demo

4. **Copy the deployed URL** (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Vercel - FREE)

1. **Create account on Vercel.com**
2. **Import Project**
   - Connect your GitHub repo
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   - Add: `VITE_API_URL=https://your-backend.onrender.com/api`

4. **Deploy!**

### Alternative: Railway.app (Both Frontend & Backend)

1. Create account on Railway.app
2. Deploy backend:
   - New Project → Deploy from GitHub
   - Select backend folder
   - Railway auto-detects Python

3. Deploy frontend:
   - New Project → Deploy from GitHub
   - Select frontend folder  
   - Add environment variable with backend URL

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Frontend can connect to backend API
- [ ] All features working (Dashboard, Transactions, Insights)
- [ ] Sample data loads correctly
- [ ] Charts render properly
- [ ] Mobile responsive
- [ ] No console errors

## Demo URL Format

After deployment, your submission should include:
- **Live App**: https://your-app.vercel.app
- **API**: https://your-api.onrender.com

## Troubleshooting

**CORS Issues**: Already handled with Flask-CORS
**API Connection**: Make sure VITE_API_URL is set correctly in Vercel
**Build Errors**: Check all dependencies are in package.json
