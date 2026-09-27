export default function Footer({ onTabChange }) {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white text-base shadow-sm">
                💎
              </div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-lg">Smart Expense</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Autonomous expense tracking, automated micro-investments, and AI financial coaching platform.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">All API Endpoints Healthy</span>
            </div>
          </div>

          {/* Quick Sections Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">Application Modules</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onTabChange('dashboard')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  📊 Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('transactions')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  💳 Transaction Ledger
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('insights')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  💡 Smart Insights
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('budgets')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  🎯 Budgets & Goals
                </button>
              </li>
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">AI & Wealth Engine</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onTabChange('advisor')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  🤖 Autonomous AI Coach
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('subscriptions')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  🔄 Subscription Leak Audit
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('advisor')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  ⚡ Yield & Growth Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Tech Stack */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">Architecture</h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <p>Frontend: React 18 + Vite + Tailwind</p>
              <p>Backend: Python Flask RESTful API</p>
              <p>Charts: Chart.js + HTML5 Canvas</p>
              <p>Environment: InnovaHack 2026</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-semibold gap-2">
          <span>© 2026 Smart Expense & Wealth Platform. All rights reserved.</span>
          <span className="flex items-center space-x-1">
            <span>Built for InnovaHack Chapter 1</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
