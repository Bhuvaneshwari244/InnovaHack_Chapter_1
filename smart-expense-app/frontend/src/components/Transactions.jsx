import { useState } from 'react'

export default function Transactions({ transactions, onAddTransaction, currencySymbol = '$', currencyRate = 1.0 }) {
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  })

  const formatMoney = (val) => `${currencySymbol}${(val * currencyRate).toFixed(2)}`

  const categories = ['All', 'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare', 'Education', 'Others']

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTransaction({
      ...formData,
      amount: parseFloat(formData.amount) / currencyRate
    })
    setFormData({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    })
    setShowForm(false)
  }

  const getCategoryBadge = (category) => {
    const badges = {
      'Food & Dining': 'bg-orange-50 text-orange-700 border-orange-200',
      'Transportation': 'bg-blue-50 text-blue-700 border-blue-200',
      'Shopping': 'bg-purple-50 text-purple-700 border-purple-200',
      'Entertainment': 'bg-pink-50 text-pink-700 border-pink-200',
      'Bills & Utilities': 'bg-slate-100 text-slate-700 border-slate-200',
      'Healthcare': 'bg-rose-50 text-rose-700 border-rose-200',
      'Education': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Others': 'bg-amber-50 text-amber-700 border-amber-200'
    }
    return badges[category] || 'bg-slate-100 text-slate-700 border-slate-200'
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl bg-white">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Transactions Ledger</h2>
          <p className="text-sm font-medium text-slate-500">Showing {filteredTransactions.length} of {transactions.length} recorded items</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition"
        >
          {showForm ? '✕ Close Form' : '+ New Transaction'}
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="glass-card p-4 rounded-2xl bg-white space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search by merchant or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl glass-input outline-none text-sm"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 rounded-xl"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-1 pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pr-1 flex-shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-pill ${selectedCategory === cat ? 'active' : 'inactive'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add Transaction Form Modal */}
      {showForm && (
        <div className="glass-card rounded-2xl p-6 border-indigo-200 bg-white shadow-xl space-y-4 animate-fade-in-up">
          <h3 className="text-lg font-bold text-slate-900">Add New Transaction</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Merchant Description</label>
              <input
                type="text"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input outline-none text-sm"
                placeholder="e.g., Starbucks Coffee / Uber Ride"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount ({currencySymbol})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input outline-none text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input outline-none text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow transition"
            >
              Add Transaction & Auto-Categorize
            </button>
          </form>
        </div>
      )}

      {/* Transactions Table */}
      <div className="glass-card rounded-2xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider text-left">
              <tr>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Round-Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">
                    No transactions matching search or category criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-slate-900 font-semibold whitespace-nowrap">{t.description}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getCategoryBadge(t.category)}`}>
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-900 font-bold whitespace-nowrap">{formatMoney(t.amount)}</td>
                    <td className="py-4 px-6 text-right text-emerald-600 font-bold whitespace-nowrap">+{formatMoney(t.roundup)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-sm">
          <span className="text-slate-600 font-bold">Showing: {filteredTransactions.length} Items</span>
          <div className="flex space-x-6">
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Total Spent</span>
              <span className="font-extrabold text-slate-900 text-base">{formatMoney(filteredTransactions.reduce((sum, t) => sum + t.amount, 0))}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Total Saved</span>
              <span className="font-extrabold text-emerald-600 text-base">{formatMoney(filteredTransactions.reduce((sum, t) => sum + t.roundup, 0))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
