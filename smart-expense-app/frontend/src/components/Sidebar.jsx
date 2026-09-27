export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊', badge: 'Overview' },
    { id: 'transactions', label: '💳 Transactions', icon: '💳', badge: '50+' },
    { id: 'tax', label: '🧾 Tax & Receipts', icon: '🧾', badge: 'NEW' },
    { id: 'portfolio', label: '⚡ Asset Allocator', icon: '⚡', badge: 'NEW' },
    { id: 'insights', label: '💡 Smart Insights', icon: '💡', badge: 'AI' },
    { id: 'budgets', label: '🎯 Budgets & Goals', icon: '🎯', badge: 'Track' },
    { id: 'advisor', label: '🤖 AI Coach', icon: '🤖', badge: 'Pro' },
    { id: 'subscriptions', label: '🔄 Subscriptions', icon: '🔄', badge: 'Audit' }
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 min-h-screen p-5 sticky top-0 h-screen overflow-y-auto shadow-xs z-30">
      
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-200">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-md shadow-indigo-100">
          💎
        </div>
        <div>
          <h2 className="font-extrabold text-slate-900 text-base leading-tight">Smart Expense</h2>
          <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            PRO v2.5
          </span>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="mt-6 flex-1 space-y-1.5">
        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Page Navigation
        </p>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 border border-indigo-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">{item.icon}</span>
                <span>{item.label.replace(/^.\s/, '')}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {item.badge}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Health & System Status Card */}
      <div className="pt-6 border-t border-slate-200 space-y-3">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">API Status: Healthy</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">InnovaHack 2026 Engine</p>
        </div>
      </div>

    </aside>
  )
}
