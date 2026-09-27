# 🚀 Quick Start Guide

## Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Git installed

## Setup (5 minutes)

### Step 1: Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```
✅ Backend should be running on http://localhost:5000

### Step 2: Frontend Setup (New Terminal)
```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```
✅ Frontend should be running on http://localhost:3000

### Step 3: Open Browser
Visit http://localhost:3000 and you should see the app running!

---

## Testing the App

### 1. Dashboard View
- See 50 pre-loaded sample transactions
- View spending breakdown by category
- Check investment growth chart
- Review monthly spending trends

### 2. Add a Transaction
- Click "Transactions" tab
- Click "+ Add Transaction"
- Fill in:
  - Description: "Starbucks Coffee"
  - Amount: 4.75
  - Date: Today
- Click "Add Transaction"
- ✅ Should auto-categorize as "Food & Dining"
- ✅ Round-up should be $0.25

### 3. View Insights
- Click "Insights" tab
- Review 4 personalized insights
- Check savings recommendations
- See potential savings calculator

---

## Project Structure

```
smart-expense-app/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
├── DEPLOYMENT.md           # Deployment guide
├── PRESENTATION_OUTLINE.md # Slide outline
└── README.md               # Project overview
```

---

## API Endpoints

### GET /api/transactions
Returns all transactions with auto-categorization and round-ups

### POST /api/transactions
Add a new transaction
```json
{
  "description": "Starbucks Coffee",
  "amount": 4.75,
  "date": "2026-07-25"
}
```

### GET /api/analytics/summary
Returns spending summary and category breakdown

### GET /api/analytics/investments
Returns simulated investment growth with projections

### GET /api/insights
Returns 4 personalized spending insights

---

## Features Checklist

✅ Transaction tracking with auto-categorization  
✅ Round-up calculation for every transaction  
✅ Beautiful dashboard with multiple charts  
✅ Category spending breakdown (Pie chart)  
✅ Investment growth visualization (Line chart)  
✅ Monthly spending trends (Bar chart)  
✅ 4 personalized smart insights  
✅ Transaction management (add/view)  
✅ Responsive design (mobile-friendly)  
✅ Clean, professional UI  

---

## Tech Stack

**Frontend**:
- ⚛️ React 18.2
- 🎨 Tailwind CSS
- 📊 Chart.js + React-Chart.js-2
- ⚡ Vite

**Backend**:
- 🐍 Python 3.13
- 🌶️ Flask 3.0
- 🔄 Flask-CORS

**Deployment**:
- 🚀 Vercel (Frontend)
- ☁️ Render (Backend)

---

## Customization

### Change Categories
Edit `CATEGORIES` dict in `backend/app.py`

### Modify Investment Return Rate
Change `monthly_return` in `/api/analytics/investments` endpoint

### Add More Sample Data
Adjust `generate_sample_transactions()` function

### Customize Colors
Edit `tailwind.config.js` theme colors

---

## Troubleshooting

**Backend not starting?**
- Check if Python 3.8+ is installed: `python --version`
- Try: `py app.py` or `python3 app.py`

**Frontend not starting?**
- Check if Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

**API connection error?**
- Make sure backend is running on port 5000
- Check frontend `.env` has correct API URL

**Charts not showing?**
- Clear browser cache
- Check browser console for errors

---

## Next Steps

1. ✅ Test all features locally
2. 📝 Customize team information in README.md
3. 🎨 Create presentation slides (6-7 slides)
4. 🎥 Record 5-minute demo video
5. 🚀 Deploy to Vercel + Render
6. 📤 Submit before July 26, 2026, 10:00 AM

---

## Support

Need help? Check:
- README.md for project overview
- DEPLOYMENT.md for deployment steps
- PRESENTATION_OUTLINE.md for slide ideas

**Good luck! 🏆**
