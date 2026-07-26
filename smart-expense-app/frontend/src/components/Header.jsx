import NotificationCenter from './NotificationCenter'

export default function Header({ currency, setCurrency, currencies, onExport, onToggleSidebar, isSidebarOpen, onOpenProfile, activeTab }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Info + 3-Lines Hamburger Sidebar Toggle */}
          <div className="flex items-center space-x-3.5">
            {/* ☰ 3-Lines Hamburger Button to Open & Close Sidebar */}
            <button
              onClick={onToggleSidebar}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-800 text-xl font-bold transition border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center cursor-pointer"
              title={isSidebarOpen ? "Close Sidebar Navigation" : "Open Sidebar Navigation"}
              aria-label="Toggle Navigation Sidebar"
            >
              ☰
            </button>

            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md shadow-indigo-100">
                💎
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Smart Expense & Wealth
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  PRO v2.5
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 hidden sm:block">Micro-Investments & Autonomous AI Coach</p>
            </div>
          </div>

          {/* Controls & Tools */}
          <div className="flex items-center space-x-3">
            
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100/90 px-3.5 py-1.5 rounded-xl border border-slate-200 focus-within:border-indigo-500 transition">
              <span className="text-xs font-bold text-slate-500">Currency:</span>
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

            {/* Live Notification Center Dropdown */}
            <NotificationCenter />

            {/* User Profile Avatar Button */}
            <button
              onClick={onOpenProfile}
              className={`flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
              title="User Profile & Settings"
              aria-label="User Profile"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-[11px] font-black flex items-center justify-center">
                AV
              </div>
              <span className="text-xs font-extrabold hidden md:inline">Alex Vance</span>
            </button>

            {/* Export CSV Action Button */}
            <button
              onClick={onExport}
              className="flex items-center space-x-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-extrabold rounded-xl border border-emerald-200 transition shadow-xs cursor-pointer"
            >
              <span>📥</span>
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <div className="hidden md:flex items-center space-x-1.5 pl-2 border-l border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-500">InnovaHack 2026</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
