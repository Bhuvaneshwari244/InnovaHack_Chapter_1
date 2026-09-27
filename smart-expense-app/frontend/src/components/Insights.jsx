export default function Insights({ insights }) {
  const getInsightIcon = (type) => {
    const icons = {
      'category': '📊',
      'savings': '💰',
      'spending': '💳',
      'subscription': '🔄'
    }
    return icons[type] || '💡'
  }

  const getInsightColor = (type) => {
    const colors = {
      'category': 'from-blue-600 to-indigo-600',
      'savings': 'from-emerald-600 to-teal-600',
      'spending': 'from-purple-600 to-pink-600',
      'subscription': 'from-amber-600 to-orange-600'
    }
    return colors[type] || 'from-slate-600 to-slate-700'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-purple-50/60">
        <div className="flex items-center space-x-4">
          <span className="text-4xl">💡</span>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Smart Insights & Analytics</h2>
            <p className="text-sm font-semibold text-slate-600">Personalized data recommendations to optimize your spending habits</p>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl overflow-hidden glass-card-hover border-slate-200 bg-white"
          >
            {/* Insight Header */}
            <div className={`bg-gradient-to-r ${getInsightColor(insight.type)} p-4`}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                <h3 className="text-base font-bold text-white">{insight.title}</h3>
              </div>
            </div>

            {/* Insight Body */}
            <div className="p-6 space-y-4 text-sm">
              <p className="text-slate-700 leading-relaxed font-medium">
                {insight.message}
              </p>

              {/* Actionable Recommendation */}
              <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-indigo-600 border border-slate-200">
                <div className="flex items-start space-x-2.5">
                  <span className="text-indigo-600 text-lg flex-shrink-0">💪</span>
                  <div>
                    <p className="text-xs font-bold text-slate-900 mb-0.5">Action Plan:</p>
                    <p className="text-xs text-slate-700 font-medium">{insight.actionable}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Pro Tips */}
      <div className="glass-card rounded-2xl p-6 bg-white">
        <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Pro Tips for Smart Spending</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl">🎯</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Set Budget Goals</h4>
              <p className="text-xs text-slate-600 mt-1">
                Establish monthly spending caps for each category to maintain discipline.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl">📅</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Weekly Financial Audits</h4>
              <p className="text-xs text-slate-600 mt-1">
                Review your weekly cadence to identify impulse spending before it grows.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl">🔄</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Automated Micro-Savings</h4>
              <p className="text-xs text-slate-600 mt-1">
                Spare change round-ups build your long-term portfolio without active friction.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl">📊</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Trend Velocity Analysis</h4>
              <p className="text-xs text-slate-600 mt-1">
                Compare month-over-month trajectory to optimize asset allocations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
