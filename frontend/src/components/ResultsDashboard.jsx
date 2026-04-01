import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Area, AreaChart 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <p className="text-emerald-400 font-medium mb-4">Year {label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex justify-between items-center gap-8 py-2 border-b border-zinc-700 last:border-none">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-zinc-300 font-medium">{entry.name}</span>
            </div>
            <span className="font-semibold text-white text-lg">₹{entry.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const rupeeFormatter = (value) => `₹${value.toLocaleString('en-IN')}`;

export default function ResultsDashboard({ results }) {
  const [oppView, setOppView] = useState('line');        // 'line' or 'area'
  const [debtViewMode, setDebtViewMode] = useState('bar'); // 'bar' or 'mixed'
  const [showYears, setShowYears] = useState(20);        // 10 or 20 years for debt vs rent

  const hasAnyResult = results.risk || results.optimize || results.opportunity || results.debtvsrent;

  if (!hasAnyResult) {
    return (
      <div className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-20 text-center">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-7xl mb-6">📈</motion.div>
        <h3 className="text-2xl font-semibold text-zinc-300">Your Analysis Results</h3>
        <p className="text-zinc-400 mt-3">Click buttons on the left to generate insights</p>
      </div>
    );
  }

  // Filter debt data based on selected years
  const filteredDebtData = results.debtvsrent?.debt_vs_rent_data 
    ? results.debtvsrent.debt_vs_rent_data.slice(0, showYears) 
    : [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-14 pb-24">

      {/* Risk Score */}
      {results.risk && (
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zinc-900 border border-zinc-700 rounded-3xl p-12"
        >
          <h3 className="text-2xl font-semibold mb-8">Debt Trap Risk Score</h3>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="text-center">
              <div className={`text-9xl font-bold tracking-tighter ${
                results.risk.risk.color === 'green' ? 'text-emerald-400' : 
                results.risk.risk.color === 'yellow' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {results.risk.risk.risk_score}
              </div>
              <div className="text-3xl mt-4">{results.risk.risk.category}</div>
            </div>
            <div className="flex-1">
              <p className="text-zinc-300 text-lg leading-relaxed">{results.risk.risk.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Optimize Loan */}
      {results.optimize && (
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zinc-900 border border-emerald-600/50 rounded-3xl p-12"
        >
          <h3 className="text-2xl font-semibold mb-8">AI Loan Optimizer</h3>
          <div className="bg-gradient-to-br from-emerald-950 to-zinc-900 border border-emerald-500 rounded-3xl p-14 text-center">
            <p className="text-emerald-400 text-sm tracking-widest">AI RECOMMENDS</p>
            <div className="text-8xl font-bold mt-6 text-emerald-400">
              {results.optimize.recommended_tenure_years} Years
            </div>
            <div className="text-4xl text-emerald-300 mt-4">
              ₹{results.optimize.recommended_emi?.toLocaleString('en-IN')} / month
            </div>
            <div className="mt-10 text-xl">
              Save <span className="font-bold text-2xl text-emerald-400">₹{results.optimize.interest_saved?.toLocaleString('en-IN')}</span> in interest
            </div>
          </div>
        </motion.div>
      )}

      {/* Opportunity Cost - Interactive Controls */}
      {results.opportunity && results.opportunity.chart_data && (
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zinc-900 border border-zinc-700 rounded-3xl p-12"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-semibold">Opportunity Cost Simulator</h3>
              <p className="text-emerald-400">EMI vs Mutual Fund Growth @12%</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-zinc-800 rounded-2xl p-1">
              <button 
                onClick={() => setOppView('line')}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${oppView === 'line' ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}
              >
                Line
              </button>
              <button 
                onClick={() => setOppView('area')}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${oppView === 'area' ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}
              >
                Area
              </button>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {oppView === 'line' ? (
                <LineChart data={results.opportunity.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="year" stroke="#52525b" />
                  <YAxis tickFormatter={rupeeFormatter} stroke="#52525b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="natural" dataKey="cumulative_emi_paid" stroke="#f43f5e" strokeWidth={5} name="EMI Paid" dot={{ r: 6 }} activeDot={{ r: 9 }} />
                  <Line type="natural" dataKey="mutual_fund_growth" stroke="#10b981" strokeWidth={6} name="Mutual Fund Growth" dot={{ r: 6 }} activeDot={{ r: 9 }} />
                </LineChart>
              ) : (
                <AreaChart data={results.opportunity.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="year" stroke="#52525b" />
                  <YAxis tickFormatter={rupeeFormatter} stroke="#52525b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="natural" dataKey="cumulative_emi_paid" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} name="EMI Paid" />
                  <Area type="natural" dataKey="mutual_fund_growth" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Mutual Fund Growth" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Debt vs Rent - Interactive Controls */}
      {results.debtvsrent && results.debtvsrent.debt_vs_rent_data && (
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-zinc-900 border border-zinc-700 rounded-3xl p-12"
        >
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Debt vs Rent Analyzer</h3>
              <p className="text-emerald-400">20 Years Projection</p>
            </div>

            <div className="flex gap-4">
              {/* Years Toggle */}
              <div className="flex bg-zinc-800 rounded-2xl p-1">
                {[10, 20].map(y => (
                  <button 
                    key={y}
                    onClick={() => setShowYears(y)}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${showYears === y ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}
                  >
                    {y} Years
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-zinc-800 rounded-2xl p-1">
                <button 
                  onClick={() => setDebtViewMode('bar')}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${debtViewMode === 'bar' ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}
                >
                  Bar
                </button>
                <button 
                  onClick={() => setDebtViewMode('mixed')}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${debtViewMode === 'mixed' ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}
                >
                  Mixed
                </button>
              </div>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDebtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="year" stroke="#52525b" />
                <YAxis tickFormatter={rupeeFormatter} stroke="#52525b" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Bar dataKey="debt_cumulative" fill="#e11d48" name="Loan Cost" radius={[8,8,0,0]} />
                <Bar dataKey="rent_cumulative" fill="#3b82f6" name="Rent Cost" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}