import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import TaxScanner from './components/TaxScanner'
import PortfolioAllocator from './components/PortfolioAllocator'
import Insights from './components/Insights'
import BudgetsGoals from './components/BudgetsGoals'
import AIAdvisor from './components/AIAdvisor'
import Subscriptions from './components/Subscriptions'
import UserProfile from './components/UserProfile'
import Header from './components/Header'
import MobileSidebar from './components/MobileSidebar'
import Footer from './components/Footer'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83.5 }
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currency, setCurrency] = useState('USD')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState(null)
  const [investments, setInvestments] = useState(null)
  const [insights, setInsights] = useState([])
  const [budgets, setBudgets] = useState([])
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.classList.remove('dark')
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [transRes, summaryRes, investRes, insightsRes, budgetsRes, goalsRes] = await Promise.all([
        axios.get(`${API_URL}/transactions`),
        axios.get(`${API_URL}/analytics/summary`),
        axios.get(`${API_URL}/analytics/investments`),
        axios.get(`${API_URL}/insights`),
        axios.get(`${API_URL}/budgets`),
        axios.get(`${API_URL}/goals`)
      ])

      setTransactions(transRes.data.transactions)
      setSummary(summaryRes.data.summary)
      setInvestments(investRes.data.investment)
      setInsights(insightsRes.data.insights)
      setBudgets(budgetsRes.data.budgets)
      setGoals(goalsRes.data.goals)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transaction) => {
    try {
      await axios.post(`${API_URL}/transactions`, transaction)
      fetchData()
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const addGoal = async (goalData) => {
    try {
      await axios.post(`${API_URL}/goals`, goalData)
      fetchData()
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  const handleExportCSV = () => {
    window.open(`${API_URL}/export`, '_blank')
  }

  const currObj = CURRENCIES[currency] || CURRENCIES.USD

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-bold text-sm">Loading Smart Expense Workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      
      {/* Slide-Over Drawer Navigation (Triggered by ☰ 3-lines button) */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        currencies={CURRENCIES}
        onExport={handleExportCSV}
      />

      {/* Main Full-Width Content Layout */}
      <div className="w-full flex flex-col justify-between flex-1">
        
        <div>
          <Header
            currency={currency}
            setCurrency={setCurrency}
            currencies={CURRENCIES}
            onExport={handleExportCSV}
            onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            isSidebarOpen={mobileSidebarOpen}
            onOpenProfile={() => setActiveTab('profile')}
            activeTab={activeTab}
          />

          {/* Sticky Tab Bar for Fast Access */}
          <div className="bg-white border-b border-slate-200 sticky top-[69px] z-20 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-2 overflow-x-auto py-2.5" aria-label="Tabs">
                {[
                  { id: 'dashboard', label: '📊 Dashboard' },
                  { id: 'transactions', label: '💳 Transactions' },
                  { id: 'tax', label: '🧾 Tax & Receipts' },
                  { id: 'portfolio', label: '⚡ Asset Allocator' },
                  { id: 'insights', label: '💡 Insights' },
                  { id: 'budgets', label: '🎯 Budgets & Goals' },
                  { id: 'advisor', label: '🤖 AI Coach' },
                  { id: 'subscriptions', label: '🔄 Subscriptions' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 border border-indigo-500'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Active Workspace View with Page Entry Transition */}
          <main key={activeTab} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 animate-page-entry">
            {activeTab === 'dashboard' && (
              <Dashboard 
                summary={summary} 
                investments={investments} 
                transactions={transactions}
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
            {activeTab === 'transactions' && (
              <Transactions 
                transactions={transactions} 
                onAddTransaction={addTransaction}
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
            {activeTab === 'tax' && (
              <TaxScanner 
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
            {activeTab === 'portfolio' && (
              <PortfolioAllocator 
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
            {activeTab === 'insights' && (
              <Insights insights={insights} />
            )}
            {activeTab === 'budgets' && (
              <BudgetsGoals 
                budgets={budgets}
                goals={goals}
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
                onAddGoal={addGoal}
              />
            )}
            {activeTab === 'advisor' && (
              <AIAdvisor 
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
            {activeTab === 'subscriptions' && (
              <Subscriptions 
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
            {activeTab === 'profile' && (
              <UserProfile 
                currencySymbol={currObj.symbol}
                currencyRate={currObj.rate}
              />
            )}
          </main>
        </div>

        {/* Footer */}
        <Footer onTabChange={(tabId) => setActiveTab(tabId)} />
      </div>

    </div>
  )
}

export default App
