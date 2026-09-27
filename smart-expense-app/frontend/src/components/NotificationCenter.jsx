import { useState } from 'react'

export default function NotificationCenter({ notifications = [], onMarkAllRead }) {
  const [isOpen, setIsOpen] = useState(false)
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'roundup', title: 'Round-up Auto-Invested', time: '10m ago', desc: '+$2.40 deposited to SPY Index Fund', read: false },
    { id: 2, type: 'budget', title: 'Budget Threshold Warning', time: '1h ago', desc: 'Food & Dining at 84% of monthly cap', read: false },
    { id: 3, type: 'subscription', title: 'Recurring Bill Alert', time: '1d ago', desc: 'Netflix subscription ($15.99) renews in 2 days', read: true },
    { id: 4, type: 'tax', title: 'Tax Deduction Found', time: '2d ago', desc: 'Hardware purchase marked as 100% tax deductible', read: true }
  ])

  const unreadCount = alerts.filter(a => !a.read).length

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })))
    if (onMarkAllRead) onMarkAllRead()
  }

  const toggleRead = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: !a.read } : a))
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-200"
        title="Notifications & Alerts"
        aria-label="Notifications"
      >
        <span className="text-base">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-slate-900 text-sm">Alert Center</h3>
                {unreadCount > 0 && (
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                    {unreadCount} New
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => toggleRead(alert.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-3 ${
                    alert.read
                      ? 'bg-slate-50 border-slate-100 opacity-75'
                      : 'bg-indigo-50/50 border-indigo-100'
                  }`}
                >
                  <span className="text-base">
                    {alert.type === 'roundup' ? '💰' : alert.type === 'budget' ? '⚠️' : alert.type === 'subscription' ? '🔄' : '🧾'}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{alert.title}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{alert.time}</span>
                    </div>
                    <p className="text-slate-600 font-medium mt-0.5">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-bold">Autonomous AI Sentinel Monitoring Active</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
