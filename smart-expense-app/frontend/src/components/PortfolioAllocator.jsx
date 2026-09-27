import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function PortfolioAllocator({ currencySymbol = '$', currencyRate = 1.0 }) {
  const [allocationData, setAllocationData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [weights, setWeights] = useState({
    'S&P 500 Index Fund': 50,
    'Tech Growth ETF': 25,
    'Crypto (BTC/ETH)': 15,
    'Physical Gold & Commodities': 10
  })

  useEffect(() => {
    fetchAllocation()
  }, [])

  const fetchAllocation = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/portfolio/allocator`)
      setAllocationData(res.data)
      if (res.data?.allocation_breakdown) {
        const initWeights = {}
        res.data.allocation_breakdown.forEach(item => {
          initWeights[item.asset] = item.weight_percentage
        })
        setWeights(initWeights)
      }
    } catch (err) {
      console.error('Portfolio Allocator API error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSliderChange = (asset, val) => {
    setWeights(prev => ({
      ...prev,
      [asset]: parseInt(val) || 0
    }))
  }

  const handleSaveAllocation = async () => {
    setSaving(true)
    try {
      await axios.post(`${API_URL}/portfolio/allocator`, { allocation: weights })
      fetchAllocation()
    } catch (err) {
      console.error('Error saving allocation:', err)
    } finally {
      setSaving(false)
    }
  }

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0)
  const formatMoney = (val) => `${currencySymbol}${((val || 0) * currencyRate).toFixed(2)}`

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 font-medium">
        Loading Micro-Investment Asset Allocator...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-purple-200 mb-3">
              <span>⚡ Automated Asset Rebalancing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Micro-Investment Portfolio Allocator
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 font-medium mt-1">
              Customize how your automated transaction round-ups are distributed across asset classes.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-center">
            <span className="block text-[11px] font-extrabold text-purple-200 uppercase">Total Round-Ups</span>
            <span className="text-2xl font-black text-white">{formatMoney(allocationData?.total_invested)}</span>
          </div>
        </div>
      </div>

      {/* Asset Allocation Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Asset Split Sliders</h3>
              <p className="text-xs text-slate-500 font-medium">Adjust weight percentages to simulate custom strategy</p>
            </div>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
              totalWeight === 100 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
              Total: {totalWeight}% {totalWeight !== 100 && '(Adjust to 100%)'}
            </span>
          </div>

          <div className="space-y-5">
            {Object.keys(weights).map((asset) => (
              <div key={asset} className="space-y-2">
                <div className="flex justify-between text-xs font-extrabold text-slate-800">
                  <span>{asset}</span>
                  <span className="text-indigo-600 font-bold">{weights[asset]}% ({formatMoney((allocationData?.total_invested || 0) * (weights[asset] / 100))})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights[asset]}
                  onChange={(e) => handleSliderChange(asset, e.target.value)}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveAllocation}
            disabled={saving || totalWeight !== 100}
            className={`w-full py-3 text-xs font-extrabold rounded-xl shadow transition ${
              totalWeight === 100 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : 'Save Allocation Weights'}
          </button>
        </div>

        {/* Current Allocation Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">Investment Distribution</h3>
            <div className="space-y-3">
              {allocationData?.allocation_breakdown?.map((item) => (
                <div key={item.asset} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{item.asset}</span>
                    <span className="text-indigo-600">{item.weight_percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item.weight_percentage}%` }}></div>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium text-right">
                    Allocated: {formatMoney(item.invested_amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
