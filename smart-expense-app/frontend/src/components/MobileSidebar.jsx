export default function MobileSidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  currencies,
  onExport
}) {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', badge: 'Overview' },
    { id: 'transactions', label: '💳 Transactions', badge: '50+' },
    { id: 'tax', label: '🧾 Tax & Receipts', badge: 'NEW' },
    { id: 'portfolio', label: '⚡ Asset Allocator', badge: 'NEW' },
    { id: 'insights', label: '💡 Insights', badge: 'AI' },
    { id: 'budgets', label: '🎯 Budgets & Goals', badge: 'Track' },
    { id: 'advisor', label: '🤖 AI Coach', badge: 'Pro' },
    { id: 'subscriptions', label: '🔄 Subscriptions', badge: 'Audit' },
    { id: 'profile', label: '👤 Profile & Settings', badge: 'User' }
  ]

  return (
    <>
      {/* Background Dimmed Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in cursor-pointer"
        />
      )}

      {/* Sliding Drawer Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-white backdrop-blur-2xl border-r border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-md shadow-indigo-100">
                💎
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base leading-tight">Smart Expense</h2>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  PRO v2.5
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition cursor-pointer"
              title="Close Sidebar"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2">
              All Application Pages
            </p>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    onClose()
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 border border-indigo-500'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <span className="text-sm">{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Drawer Bottom Controls */}
        <div className="pt-5 border-t border-slate-200 space-y-3">
          
          {/* Currency Switcher */}
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-600">Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              {Object.keys(currencies).map((code) => (
                <option key={code} value={code} className="bg-white text-slate-800">
                  {currencies[code].symbol} {code}
                </option>
              ))}
            </select>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={() => {
              onExport()
              onClose()
            }}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-extrabold rounded-xl border border-emerald-200 transition shadow-xs cursor-pointer"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
        </div>
      </aside>
    </>
  )
}
