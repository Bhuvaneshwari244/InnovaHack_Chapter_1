import { useState } from 'react'

export default function UserProfile({ currencySymbol = '$', currencyRate = 1.0 }) {
  const [profile, setProfile] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@innovahack.com',
    phone: '+1 (555) 234-5678',
    memberSince: 'January 2026',
    plan: 'Pro v2.5 Plan',
    connectedBank: 'Chase Sapphire Preferred (**** 4892)',
    roundupMultiplier: '1x (Standard)',
    autoInvestThreshold: '$10.00',
    riskTolerance: 'Balanced (8% Target Return)',
    emailAlerts: true,
    weeklyReport: true,
    twoFactorAuth: true
  })

  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-indigo-100">
            AV
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-slate-900">{profile.fullName}</h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {profile.plan}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{profile.email} • Member since {profile.memberSince}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
        >
          {isEditing ? 'Cancel Editing' : '✏️ Edit Profile'}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-in flex items-center justify-between">
          <span>✅ Profile and financial preference settings saved successfully!</span>
        </div>
      )}

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Account Info Form */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Personal & Account Information</h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Connected Primary Bank Account</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profile.connectedBank}
                  onChange={(e) => setProfile({ ...profile, connectedBank: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Micro-Investment Preferences */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Micro-Investment Engine Rules</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Spare Change Roundup Multiplier</label>
                  <select
                    disabled={!isEditing}
                    value={profile.roundupMultiplier}
                    onChange={(e) => setProfile({ ...profile, roundupMultiplier: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 outline-none cursor-pointer"
                  >
                    <option value="1x (Standard)">1x (Standard Roundup)</option>
                    <option value="2x (Double Savings)">2x (Double Savings Boost)</option>
                    <option value="3x (Aggressive Wealth)">3x (Aggressive Wealth Boost)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Investment Risk Strategy</label>
                  <select
                    disabled={!isEditing}
                    value={profile.riskTolerance}
                    onChange={(e) => setProfile({ ...profile, riskTolerance: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 disabled:bg-slate-50 disabled:text-slate-600 outline-none cursor-pointer"
                  >
                    <option value="Conservative (5% Target Return)">Conservative (5% Yield)</option>
                    <option value="Balanced (8% Target Return)">Balanced (8% Yield)</option>
                    <option value="Aggressive (12% Target Return)">Aggressive Tech ETF (12% Yield)</option>
                  </select>
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* Right Column: Security & Subscriptions */}
        <div className="space-y-6">
          
          {/* Security & Alerts */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Security & Notifications</h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-slate-700">Two-Factor Auth (2FA)</span>
                <input
                  type="checkbox"
                  checked={profile.twoFactorAuth}
                  onChange={(e) => setProfile({ ...profile, twoFactorAuth: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-slate-700">Instant Transaction Alerts</span>
                <input
                  type="checkbox"
                  checked={profile.emailAlerts}
                  onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-slate-700">Weekly AI Financial Digest</span>
                <input
                  type="checkbox"
                  checked={profile.weeklyReport}
                  onChange={(e) => setProfile({ ...profile, weeklyReport: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Quick Bank Status Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">Connected Card</span>
              <span className="text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                Active Sync
              </span>
            </div>
            <p className="text-lg font-black tracking-widest mt-2">•••• •••• •••• 4892</p>
            <div className="flex justify-between items-center text-xs text-indigo-200 pt-2 border-t border-white/10 font-medium">
              <span>Plaid Bank Sync</span>
              <span>Exp: 09/28</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
