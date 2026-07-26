import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function TaxScanner({ currencySymbol = '$', currencyRate = 1.0 }) {
  const [taxData, setTaxData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [scannedReceipt, setScannedReceipt] = useState(null)

  useEffect(() => {
    fetchTaxData()
  }, [])

  const fetchTaxData = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/tax`)
      setTaxData(res.data)
    } catch (err) {
      console.error('Tax API error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSimulateScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScannedReceipt({
        merchant: 'Tech Supplies & Office Depot',
        amount: 189.50,
        category: 'Bills & Utilities',
        date: new Date().toISOString().split('T')[0],
        deductible: true,
        taxSaved: 189.50 * 0.25
      })
    }, 1500)
  }

  const formatMoney = (val) => `${currencySymbol}${((val || 0) * currencyRate).toFixed(2)}`

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 font-medium">
        Analyzing tax-deductible transactions & computing tax shield...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-emerald-200 mb-3">
              <span>🧾 Automatic Tax Shield Estimator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tax Deductibility & Expense Classifier
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
              Identify business write-offs, track tax shield savings, and scan receipts in real time.
            </p>
          </div>

          <button
            onClick={handleSimulateScan}
            disabled={scanning}
            className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-2xl shadow-md transition flex items-center justify-center space-x-2"
          >
            <span>{scanning ? '🔄 Scanning...' : '📷 Scan Receipt (Demo)'}</span>
          </button>
        </div>
      </div>

      {/* Scanned Receipt Modal Result */}
      {scannedReceipt && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 shadow-sm animate-fade-in-up space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-emerald-900 text-base">✅ Receipt Scanned & Categorized</h3>
            <button onClick={() => setScannedReceipt(null)} className="text-xs font-bold text-emerald-700 hover:text-emerald-900">
              ✕ Dismiss
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-emerald-950">
            <div>
              <span className="text-emerald-700 block text-[11px]">Merchant</span>
              <span>{scannedReceipt.merchant}</span>
            </div>
            <div>
              <span className="text-emerald-700 block text-[11px]">Amount</span>
              <span>{formatMoney(scannedReceipt.amount)}</span>
            </div>
            <div>
              <span className="text-emerald-700 block text-[11px]">Status</span>
              <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">Tax Deductible</span>
            </div>
            <div>
              <span className="text-emerald-700 block text-[11px]">Est. Tax Saved (25%)</span>
              <span className="text-emerald-700 font-extrabold">{formatMoney(scannedReceipt.taxSaved)}</span>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Tax Write-Offs</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{formatMoney(taxData?.total_deductible)}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Classified business expenses</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Estimated Tax Saved</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{formatMoney(taxData?.estimated_tax_savings)}</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">Based on 25% tax bracket</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Deductible Items</p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">{taxData?.deductible_count || 0}</p>
          <p className="text-xs text-indigo-600 font-bold mt-1">Auto-tagged receipts</p>
        </div>
      </div>

      {/* Deductibles Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-lg font-extrabold text-slate-900 mb-4">Tax Deductible Transactions Log</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider text-left bg-slate-50">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-right">Est. Tax Shield (25%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {taxData?.deductible_transactions?.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">{t.date}</td>
                  <td className="py-3.5 px-4 text-slate-900 font-bold whitespace-nowrap">{t.description}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-900 font-extrabold whitespace-nowrap">{formatMoney(t.amount)}</td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 font-extrabold whitespace-nowrap">
                    +{formatMoney(t.amount * 0.25)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
