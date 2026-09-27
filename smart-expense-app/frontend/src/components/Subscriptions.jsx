import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Subscriptions({ currencySymbol, currencyRate }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [cancelledList, setCancelledList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/subscriptions`)
      setSubscriptions(res.data.subscriptions || [])
    } catch (err) {
      console.error('Subscription error:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleCancel = (name) => {
    if (cancelledList.includes(name)) {
      setCancelledList(cancelledList.filter(item => item !== name))
    } else {
      setCancelledList([...cancelledList, name])
    }
  }

  const formatMoney = (val) => `${currencySymbol}${(val * currencyRate).toFixed(2)}`

  const activeSubs = subscriptions.filter(s => !cancelledList.includes(s.name))
  const monthlySpent = activeSubs.reduce((acc, s) => acc + s.amount, 0)
  const annualSpent = monthlySpent * 12
  const savedAnnual = cancelledList.reduce((acc, name) => {
    const sub = subscriptions.find(s => s.name === name)
    return acc + (sub ? sub.annual_cost : 0)
  }, 0)

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center text-slate-500 bg-white">
        Scanning transaction history for recurring subscription charges...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Banner & Savings Impact Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border-l-4 border-purple-500 bg-white">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Monthly Subscriptions</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{formatMoney(monthlySpent)}</p>
          <p className="text-xs text-slate-500 mt-1">{activeSubs.length} recurring services detected</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border-l-4 border-indigo-500 bg-white">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Annual Subscription Cost</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">{formatMoney(annualSpent)}</p>
          <p className="text-xs text-slate-500 mt-1">Projected yearly expenditure</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50">
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Simulated Annual Savings</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{formatMoney(savedAnnual)}</p>
          <p className="text-xs text-emerald-700 mt-1">From {cancelledList.length} marked cancellations</p>
        </div>
      </div>

      {/* Subscription Cards & Cancellation Simulator */}
      <div className="glass-card rounded-2xl p-6 bg-white">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900">🔄 Recurring Subscriptions Hub</h3>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Toggle <strong>"Simulate Cancellation"</strong> to test how much cash you can divert into micro-investments!
          </p>
        </div>

        <div className="space-y-4">
          {subscriptions.map((sub) => {
            const isCancelled = cancelledList.includes(sub.name)
            return (
              <div
                key={sub.name}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCancelled 
                    ? 'bg-slate-50 border-slate-200 opacity-60' 
                    : 'bg-white border-slate-200 glass-card-hover'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${
                    isCancelled 
                      ? 'bg-slate-200 border-slate-300' 
                      : 'bg-purple-50 border-purple-200 text-purple-600'
                  }`}>
                    {sub.name.toLowerCase().includes('netflix') ? '🎬' : sub.name.toLowerCase().includes('spotify') ? '🎵' : sub.name.toLowerCase().includes('gym') ? '🏋️' : '⚡'}
                  </div>

                  <div>
                    <h4 className={`font-bold text-base ${isCancelled ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {sub.name}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="px-2 py-0.5 bg-slate-100 rounded font-semibold text-slate-600">{sub.category}</span>
                      <span>Last: {sub.last_paid}</span>
                      <span>Cadence: {sub.frequency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end space-x-6">
                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-base">{formatMoney(sub.amount)} / mo</p>
                    <p className="text-xs text-slate-500">{formatMoney(sub.annual_cost)} / yr</p>
                  </div>

                  <button
                    onClick={() => toggleCancel(sub.name)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition shadow-sm border ${
                      isCancelled
                        ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                        : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    {isCancelled ? '✓ Keep Subscription' : '✂️ Simulate Cancellation'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
