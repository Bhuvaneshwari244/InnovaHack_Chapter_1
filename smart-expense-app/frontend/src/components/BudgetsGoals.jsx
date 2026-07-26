import { useState } from 'react'

export default function BudgetsGoals({ budgets, goals, currencySymbol, currencyRate, onAddGoal }) {
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [title, setTitle] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [icon, setIcon] = useState('🎯')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !targetAmount) return
    onAddGoal({
      title,
      target_amount: parseFloat(targetAmount) / currencyRate,
      current_amount: 0,
      target_date: targetDate || '2026-12-31',
      icon
    })
    setTitle('')
    setTargetAmount('')
    setShowGoalModal(false)
  }

  const formatMoney = (val) => `${currencySymbol}${(val * currencyRate).toFixed(2)}`

  return (
    <div className="space-y-8">
      {/* Category Budgets Section */}
      <div className="glass-card rounded-2xl p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">📊 Monthly Category Limits</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">Real-time budget tracking & alert triggers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgets?.map((b) => {
            const isExceeded = b.status === 'exceeded'
            const isWarning = b.status === 'warning'
            
            return (
              <div key={b.category} className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 glass-card-hover">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 text-sm">{b.category}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                    isExceeded 
                      ? 'bg-rose-100 text-rose-700 border-rose-200' 
                      : isWarning 
                        ? 'bg-amber-100 text-amber-800 border-amber-200' 
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {isExceeded ? 'Over Budget' : isWarning ? 'Near Limit' : 'On Track'}
                  </span>
                </div>

                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <span>Spent: {formatMoney(b.spent)}</span>
                  <span>Limit: {formatMoney(b.limit)}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isExceeded ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(b.percentage, 100)}%` }}
                  ></div>
                </div>

                <div className="mt-2 text-[11px] font-semibold text-right text-slate-500">
                  {b.percentage}% used ({b.remaining >= 0 ? `${formatMoney(b.remaining)} left` : `${formatMoney(Math.abs(b.remaining))} over`})
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Savings Goals Tracker */}
      <div className="glass-card rounded-2xl p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">🎯 Wealth & Savings Milestones</h2>
            <p className="text-xs font-semibold text-slate-500 mt-1">Goal tracking accelerated by micro-investments</p>
          </div>
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition"
          >
            + Create Goal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals?.map((g) => (
            <div key={g.id} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 glass-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{g.icon || '🎯'}</span>
                    <h3 className="font-bold text-slate-900 text-base">{g.title}</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg">
                    {g.progress}%
                  </span>
                </div>

                <div className="space-y-1.5 mb-4 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current</span>
                    <span className="font-bold text-emerald-600">{formatMoney(g.current_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target</span>
                    <span className="font-bold text-slate-900">{formatMoney(g.target_amount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 pt-1">
                    <span>Target: {g.target_date}</span>
                    <span>Left: {formatMoney(g.remaining)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${g.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card bg-white border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create Savings Goal</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vacation / Laptop"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Amount ({currencySymbol})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="1000.00"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Icon</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input outline-none text-sm bg-white text-slate-900"
                >
                  <option value="🎯">🎯 Target</option>
                  <option value="💻">💻 Tech / Laptop</option>
                  <option value="✈️">✈️ Travel</option>
                  <option value="🚗">🚗 Car</option>
                  <option value="🛡️">🛡️ Safety Fund</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-input outline-none text-sm"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 py-2 border border-slate-300 rounded-xl text-slate-700 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
