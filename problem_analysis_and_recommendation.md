# InnovaHack Chapter 1 - Problem Analysis & Recommendation

## Competition Overview
- **Deadline**: July 26, 2026, 10:00 AM (IST)
- **Format**: Choose 1 problem from 5 domains
- **Submission**: Deployed URL + Presentation (6-7 slides) + Optional 5-min video

---

## All Problems Ranked by Difficulty (Easiest to Hardest)

### 🏆 RECOMMENDED: FINTECH - Problem 2
**Smart Expense & Micro-Investment Assistant**

**Why This is THE EASIEST to Win:**
1. ✅ **Simple, Clear Scope** - Track spending, categorize, round-up, visualize savings
2. ✅ **Well-Defined Tech Stack** - Standard web dev + basic ML for categorization
3. ✅ **No Complex Infrastructure** - Can use mock data, no real banking APIs needed
4. ✅ **Visual Impact** - Dashboard with charts = impressive demo
5. ✅ **4-5 Hour Build Time** - Completely doable in 1 day

**Technical Implementation (Quick Win):**
- **Frontend**: React/Vue with Chart.js for visualizations
- **Backend**: Flask/Express for transaction processing
- **Categorization**: Simple keyword matching or pre-trained text classifier
- **Round-up Logic**: Basic math (ceiling function)
- **Simulated Portfolio**: Mock investment growth calculator
- **Demo Data**: Generate 3-6 months of sample transactions

**Winning Features to Include:**
- Clean dashboard with spending breakdown (pie chart)
- Monthly savings growth chart (line graph)
- Top 3 spending insights ("You spent 30% on food this month")
- Round-up impact calculator ("You saved $127 this quarter")

---

### 🥈 SECOND EASIEST: GEN AI - Problem 2
**Personalized AI Study/Interview Coach**

**Why It's Easy:**
1. ✅ Uses existing AI APIs (OpenAI/Anthropic)
2. ✅ Straightforward flow: Question → Answer → Feedback
3. ✅ No complex multi-agent orchestration
4. ✅ Good demo potential

**Challenges:**
- ❌ Requires paid API keys
- ❌ Harder to show "adaptive difficulty" convincingly
- ⚠️ Evaluation logic needs to be smart

---

### 🥉 THIRD: CYBERSECURITY - Problem 2
**Phishing & Malicious URL Detector**

**Why It's Moderate:**
1. ✅ Browser extension = cool demo
2. ✅ Can use existing ML models
3. ✅ Clear success metrics

**Challenges:**
- ❌ Needs training data for ML classifier
- ❌ Browser extension requires specific knowledge
- ⚠️ Heuristics need to be well-designed

---

### 4. FINTECH - Problem 1
**Hidden Subscription & Recurring Payment Leak Detector**

**Complexity**: Medium-High
- Requires NLP for parsing unstructured SMS/emails
- Pattern detection across time is complex
- Price increase detection needs historical tracking

---

### 5. AGENTIC AI - Problem 2
**AI Meeting & Follow-Up Agent**

**Complexity**: Medium-High
- Transcript processing with NLP
- Action item extraction is non-trivial
- Automated reminders need scheduling system
- Assignment logic requires entity recognition

---

### 6. CYBERSECURITY - Problem 1
**Autonomous Threat Hunter for Insider Attacks**

**Complexity**: High
- Behavioral baseline modeling is advanced ML
- Anomaly detection at scale
- Low false-positive requirement is very challenging
- Needs realistic simulated logs

---

### 7. GEN AI - Problem 1
**Autonomous Multi-Agent Research & Fact-Verification**

**Complexity**: High
- Multi-agent orchestration is complex
- Hallucination detection is research-level
- Cross-verification logic is sophisticated
- Confidence scoring for each claim

---

### 8. AGENTIC AI - Problem 1
**Autonomous Personal Assistant for Multi-Step Tasks**

**Complexity**: Very High
- Task decomposition requires advanced planning
- Multi-tool/API orchestration with error handling
- State management across complex workflows
- This is basically building a production-grade AI agent

---

### 9. STARTUP - Open Innovation
**Bring Your Own Idea**

**Risk Level**: HIGHEST
- No clear requirements = harder to judge success
- Must convince judges it's a "real problem"
- Higher risk of being seen as incomplete

---

## 🎯 FINAL RECOMMENDATION

### **BUILD: FINTECH Problem 2 - Smart Expense & Micro-Investment Assistant**

## Quick Implementation Plan (6-8 Hours Total)

### Hour 1-2: Setup & Backend
```python
# Flask backend with transaction API
- Transaction data model
- CSV upload endpoint
- Categorization logic (keyword-based)
- Round-up calculator
- Simulated investment growth
```

### Hour 3-4: Frontend Dashboard
```javascript
// React + Chart.js
- Transaction list view
- Spending breakdown (pie chart)
- Savings growth over time (line chart)
- Top insights cards
```

### Hour 5-6: Polish & Demo
- Add sample data (3-6 months)
- Styling with Tailwind/Bootstrap
- Create mock "investment portfolios"
- Test full user flow

### Hour 7-8: Presentation & Deployment
- Deploy to Vercel/Netlify (frontend) + Render/Railway (backend)
- Create 6-7 slide PPT
- Record 3-5 minute demo video

---

## Why This Wins

1. **Complete Solution** - All features are implementable
2. **Visual Impact** - Dashboard looks professional
3. **Clear Value** - Everyone understands "save money automatically"
4. **Demo-able** - Can show real calculations and insights
5. **Low Risk** - No complex AI, no external dependencies
6. **Judges Love It** - Practical, useful, well-scoped

---

## Tech Stack Recommendation

**Frontend:**
- React.js + Vite
- Chart.js or Recharts
- Tailwind CSS
- Axios

**Backend:**
- Flask (Python) or Express.js (Node.js)
- SQLite or JSON file for data
- Simple categorization logic

**Deployment:**
- Frontend: Vercel / Netlify (free)
- Backend: Render / Railway (free tier)

**Time to Build:** 6-8 hours with a focused team

---

## Alternative If You Want AI Credit

If you want to add more "AI" buzzwords for judges:
- Use OpenAI API for "smart" transaction categorization
- Add a chatbot that answers spending questions
- Include "AI-powered insights" generation

But honestly, the simple version wins because it's **complete and polished**.

---

## Next Steps

1. ✅ Accept this recommendation
2. ✅ Setup development environment
3. ✅ Build MVP in 6-8 hours
4. ✅ Test thoroughly
5. ✅ Deploy
6. ✅ Create presentation
7. ✅ Submit before deadline

**Let's build this and win! 🚀**
