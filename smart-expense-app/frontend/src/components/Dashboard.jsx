import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Pie, Line, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function Dashboard({ summary, investments, transactions, currencySymbol = '$', currencyRate = 1.0 }) {
  const formatMoney = (val) => `${currencySymbol}${((val || 0) * currencyRate).toFixed(2)}`

  // Category breakdown for pie chart
  const categoryData = {
    labels: Object.keys(summary?.category_breakdown || {}),
    datasets: [{
      data: Object.values(summary?.category_breakdown || {}).map(v => v * currencyRate),
      backgroundColor: [
        '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', 
        '#ef4444', '#ec4899', '#06b6d4', '#3b82f6'
      ],
      borderWidth: 2,
      borderColor: '#ffffff',
      hoverOffset: 8
    }]
  }

  // Investment growth line chart
  const growthData = {
    labels: investments?.growth_timeline?.map(g => g.month) || [],
    datasets: [{
      label: `Investment Portfolio (${currencySymbol})`,
      data: investments?.growth_timeline?.map(g => g.total * currencyRate) || [],
      borderColor: '#10b981',
      borderWidth: 3,
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#10b981',
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  }

  // Monthly spending bar chart
  const monthlyData = {
    labels: Object.keys(summary?.monthly_spending || {}).sort(),
    datasets: [{
      label: `Monthly Spending (${currencySymbol})`,
      data: Object.keys(summary?.monthly_spending || {})
        .sort()
        .map(month => summary.monthly_spending[month] * currencyRate),
      backgroundColor: '#6366f1',
      hoverBackgroundColor: '#4f46e5',
      borderRadius: 10
    }]
  }

  const lightChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#334155',
          font: { family: 'Plus Jakarta Sans', size: 12, weight: '700' }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { color: '#64748b', font: { weight: '600' } }
      },
      y: {
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { color: '#64748b', font: { weight: '600' } }
      }
    }
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#334155',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '700' }
        }
      }
    }
  }

  return (
    <div className="space-y-8">
      
      {/* 🚀 FINTECH HERO / PLATFORM HIGHLIGHT BANNER */}
      <div className="hero-banner rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)' }}>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-xs font-extrabold text-white animate-float">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Automated Financial Intelligence & Micro-Investments</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Turn Daily Expenses into Compound Portfolio Growth
            </h1>

            <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
              Autonomous spare-change roundups, AI-driven category budget caps, and real-time subscription leak detection built for modern financial clarity.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3.5 rounded-2xl flex-1 lg:flex-initial text-center shadow-sm hover:scale-105 transition-transform duration-300">
              <span className="block text-[11px] font-extrabold text-indigo-200 uppercase tracking-wider">90-Day Yield</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-300">+{investments?.return_rate || 8}% APY</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3.5 rounded-2xl flex-1 lg:flex-initial text-center shadow-sm hover:scale-105 transition-transform duration-300">
              <span className="block text-[11px] font-extrabold text-indigo-200 uppercase tracking-wider">Total Saved</span>
              <span className="text-xl sm:text-2xl font-black text-white">{formatMoney(summary?.total_roundup)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Spent */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs interactive-card cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Spent</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {formatMoney(summary?.total_spent)}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">Last 90 days aggregated</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-2xl hover:rotate-12 transition-transform duration-300">
              💳
            </div>
          </div>
        </div>

        {/* Round-Up Savings */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs interactive-card cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Round-Up Savings</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-2 tracking-tight">
                {formatMoney(summary?.total_roundup)}
              </p>
              <p className="text-xs text-emerald-600 font-bold mt-1">Automated spare change</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300">
              💰
            </div>
          </div>
        </div>

        {/* Portfolio Value */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs interactive-card cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Portfolio Value</p>
              <p className="text-3xl font-extrabold text-indigo-600 mt-2 tracking-tight">
                {formatMoney(investments?.current_balance)}
              </p>
              <p className="text-xs text-emerald-600 font-bold mt-1">
                +{formatMoney(investments?.total_interest)} yield return
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center text-2xl hover:rotate-12 transition-transform duration-300">
              📈
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs interactive-card cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Transactions</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {summary?.total_transactions || 0}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Avg: {formatMoney(summary?.avg_transaction)}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-300">
              📊
            </div>
          </div>
        </div>

      </div>

      {/* AI Top Category Alert Banner */}
      {summary?.top_category && (
        <div className="rounded-2xl p-6 border border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 shadow-xs">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-3xl border border-indigo-100 shadow-xs flex-shrink-0">
              🎯
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-slate-900">AI Spending Insight</h3>
                <span className="text-[10px] bg-indigo-600 text-white px-2.5 py-0.5 rounded-full font-bold">Top Category</span>
              </div>
              <p className="mt-1 text-sm text-slate-800 font-medium">
                You spent <span className="font-bold text-indigo-700">{summary.top_category.percentage}%</span> ({formatMoney(summary.top_category.amount)}) 
                on <span className="font-bold text-slate-900">{summary.top_category.name}</span> in the last 90 days.
              </p>
              <p className="mt-2 text-xs text-indigo-900 font-semibold">
                💡 Actionable Tip: Trimming this category by 10% redirects {formatMoney(summary.top_category.amount * 0.1)} per quarter into your micro-investment portfolio!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Breakdown */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Category Allocation</h3>
          <div className="h-80">
            <Pie data={categoryData} options={pieChartOptions} />
          </div>
        </div>

        {/* Investment Growth */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Investment Growth Trajectory</h3>
            <div className="h-72">
              <Line data={growthData} options={lightChartOptions} />
            </div>
          </div>
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex justify-between items-center">
            <span className="text-xs text-emerald-900 font-bold">Projected Annual Return ({investments?.return_rate || 8}%)</span>
            <span className="text-base font-extrabold text-emerald-700">{formatMoney(investments?.projected_annual)}</span>
          </div>
        </div>

      </div>

      {/* Monthly Spending Trend */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Monthly Spending Velocity</h3>
        <div className="h-80">
          <Bar data={monthlyData} options={lightChartOptions} />
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
          <span className="text-xs font-bold text-slate-500">Latest 5 Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider text-left bg-slate-50">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-right">Round-Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions?.slice(0, 5).map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3.5 px-4 text-slate-900 font-bold whitespace-nowrap">{t.description}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-900 font-extrabold whitespace-nowrap">{formatMoney(t.amount)}</td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 font-extrabold whitespace-nowrap">+{formatMoney(t.roundup)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
