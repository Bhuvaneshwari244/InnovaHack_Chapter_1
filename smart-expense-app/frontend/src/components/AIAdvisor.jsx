import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function AIAdvisor({ currencySymbol, currencyRate }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Welcome! I am your AI Financial Advisor. Ask me questions about spending optimization, subscription cleanup, or compound investment growth!'
    }
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [strategy, setStrategy] = useState('balanced')
  const [projections, setProjections] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAdvisorResponse('')
  }, [strategy])

  const fetchAdvisorResponse = async (queryText) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_URL}/advisor/chat`, {
        query: queryText,
        strategy: strategy
      })

      if (queryText) {
        setMessages(prev => [
          ...prev,
          { sender: 'user', text: queryText },
          { sender: 'bot', text: res.data.reply }
        ])
      }
      setProjections(res.data.projections_5yr || [])
    } catch (err) {
      console.error('Advisor error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputQuery.trim()) return
    const text = inputQuery
    setInputQuery('')
    fetchAdvisorResponse(text)
  }

  const presetQueries = [
    'How can I save $200 more per month?',
    'Analyze my subscription expenses',
    'What is my 3-year investment growth projection?'
  ]

  const formatMoney = (val) => `${currencySymbol}${(val * currencyRate).toFixed(2)}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Chat Console */}
      <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col h-[620px] bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl flex items-center justify-center text-xl font-bold">
              🤖
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">AI Financial Coach</h3>
              <p className="text-xs font-semibold text-slate-500">Autonomous Portfolio Optimization & Advice</p>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-4 py-3 rounded-2xl text-xs text-slate-500 animate-pulse border border-slate-200">
                AI Coach is analyzing financial transactions...
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {presetQueries.map((q, i) => (
            <button
              key={i}
              onClick={() => fetchAdvisorResponse(q)}
              className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full border border-indigo-200 transition"
            >
              💡 {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            placeholder="Ask your AI coach a financial question..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl glass-input outline-none text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Strategy Simulator & 5-Year Projections */}
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 bg-white">
          <h3 className="font-bold text-slate-900 text-lg mb-1">⚡ Investment Strategy Simulator</h3>
          <p className="text-xs font-semibold text-slate-500 mb-4">Risk tolerance selector for compound return projections</p>

          <div className="space-y-3">
            {[
              { key: 'conservative', label: 'Conservative (5% Return)', desc: 'Low volatility, fixed income & yields' },
              { key: 'balanced', label: 'Balanced (8% Return)', desc: 'Diversified index funds & ETF portfolio' },
              { key: 'aggressive', label: 'Aggressive (12% Return)', desc: 'High growth tech & equity focus' }
            ].map((s) => (
              <label
                key={s.key}
                onClick={() => setStrategy(s.key)}
                className={`block p-3.5 rounded-xl border cursor-pointer transition ${
                  strategy === s.key ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{s.label}</span>
                  <input
                    type="radio"
                    name="strategy"
                    checked={strategy === s.key}
                    onChange={() => setStrategy(s.key)}
                    className="text-indigo-600"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
              </label>
            ))}
          </div>
        </div>

        {/* 5-Year Wealth Trajectory Card */}
        <div className="glass-card rounded-2xl p-6 border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50">
          <h4 className="text-lg font-bold text-slate-900 mb-1">🚀 5-Year Wealth Trajectory</h4>
          <p className="text-xs font-semibold text-emerald-700 mb-4">Projected compound growth from automated round-ups</p>

          <div className="space-y-3">
            {projections.map((p, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-emerald-200/60 pb-2">
                <span className="text-slate-600 font-semibold">{p.year}</span>
                <span className="font-bold text-emerald-700 text-sm">{formatMoney(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
