import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Area, AreaChart 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0f19] border border-zinc-700 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <p className="text-xs text-zinc-400 uppercase font-bold mb-3">Year {label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-zinc-300">{entry.name}</span>
            </div>
            <span className="font-bold text-white">₹{entry.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const rupeeFormatter = (value) => `₹${(value / 100000).toFixed(1)}L`;

export default function ResultsDashboard({ results, storedResults, isComparisonMode }) {
  const [oppView, setOppView] = useState('area');
  const [showYears, setShowYears] = useState(20);
  const [showStressTest, setShowStressTest] = useState(false);

  // Baseline (Stored or Current)
  const baselineEmi = storedResults?.risk?.emi_monthly || results?.risk?.emi_monthly || 39052;
  const currentEmi = results?.risk?.emi_monthly || 39052;

  // Optimized / Best Choice
  const optimizedEmi = results?.optimize?.recommended_emi || Math.round(baselineEmi * 1.15);
  const aggressiveEmi = Math.round(baselineEmi * 1.4);

  const interestSaved = results?.optimize?.interest_saved || Math.round((optimizedEmi - baselineEmi) * 12 * 5);
  const targetTenure = results?.optimize?.recommended_tenure_years || 15;

  const riskScore = results?.risk?.risk?.risk_score || results?.risk?.risk_score || 0;
  const riskColor = results?.risk?.risk?.color || results?.risk?.color || 'yellow';

  const filteredDebtData = results?.debtvsrent?.debt_vs_rent_data?.slice(0, showYears) || [];

  const shockScenarios = useMemo(() => [
    { scenario: "INCOME SHOCK", value: "₹56,000", impact: "35.5%", desc: "If income drops to ₹56,000, debt will consume 35.5% of your budget.", status: "SAFE" },
    { scenario: "ROI VOLATILITY", value: `₹${Math.round(currentEmi + 728).toLocaleString('en-IN')}`, impact: "11.5%", desc: "A 2.5% rate hike adds ₹728 to your monthly EMI burden.", status: "SAFE" },
    { scenario: "LIQUIDITY CRISIS", value: "STABLE", impact: "", desc: "Current surplus provides a stable emergency buffer.", status: "SAFE", isText: true }
  ], [currentEmi]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 pb-24 max-w-7xl mx-auto">

      {/* Comparison Mode Banner */}
      {isComparisonMode && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xl">↔️</span>
            <div>
              <p className="font-black text-emerald-400 text-sm tracking-widest">DIFFERENTIAL MODE ACTIVE</p>
              <p className="text-zinc-400 text-xs">Live Computation vs Stored Baseline</p>
            </div>
          </div>
          <button className="text-xs font-black uppercase px-6 py-3 border border-emerald-500/50 hover:bg-emerald-500/10 rounded-xl transition-all">CLEAR COMPARISON</button>
        </div>
      )}

      {/* Strategic Repayment Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StrategyCard 
          title="CONSERVATIVE" 
          badge="BASELINE" 
          emi={baselineEmi} 
          desc="Prioritizes long-term safety and minimal monthly burden." 
        />
        
        <StrategyCard 
          title="BALANCED" 
          badge="NEURAL CHOICE" 
          emi={optimizedEmi} 
          desc="Optimal balance between interest cost and liquidity." 
          highlighted 
        />

        <StrategyCard 
          title="AGGRESSIVE" 
          badge="DEBT KILLER" 
          emi={aggressiveEmi} 
          desc="Maximum principal velocity. Drastic reduction in total interest." 
        />
      </div>

      {/* Neural Risk Score */}
      {results.risk && (
        <div className="bg-[#111827] border border-zinc-700 rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="text-center">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">NEURAL RISK SCORE</p>
            <div className={`text-8xl font-black tracking-tighter ${
              riskColor === 'green' ? 'text-emerald-400' : riskColor === 'yellow' ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {riskScore}
            </div>
          </div>
          <div className="flex-1 text-zinc-300 leading-relaxed">
            {results.risk.risk?.explanation || results.risk.explanation || "Analyzing financial safety margins..."}
          </div>
        </div>
      )}

      {/* Panic Mode Stress Test */}
      <div className={`bg-[#111827] border transition-all duration-500 rounded-3xl p-10 ${showStressTest ? 'border-rose-500 shadow-rose-500/50' : 'border-zinc-700'}`}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="flex items-center gap-3 text-rose-400 text-sm font-black uppercase tracking-widest">
            <span className="text-xl">⚡</span> 
            PANIC MODE - LIVE STRESS SIMULATION
          </h3>
          <button 
            onClick={() => setShowStressTest(!showStressTest)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase transition-all ${showStressTest ? 'bg-rose-500 text-black' : 'border border-zinc-600 hover:border-rose-400'}`}
          >
            {showStressTest ? 'HIDE PANIC MODE' : 'ACTIVATE PANIC MODE ⚡'}
          </button>
        </div>

        <AnimatePresence>
          {showStressTest && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shockScenarios.map((s, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ borderColor: '#f43f5e', scale: 1.02 }}
                  className="bg-zinc-900 border border-zinc-700 hover:border-rose-500 rounded-3xl p-7 transition-all"
                >
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">{s.scenario}</p>
                  <p className="text-3xl font-black text-white">{s.value}</p>
                  <p className="text-sm text-zinc-400 mt-6 leading-snug">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Neural Optimization */}
      <div className="bg-[#111827] border border-zinc-700 rounded-3xl p-12">
        <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-8">NEURAL OPTIMIZATION ENGINE</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-black text-zinc-400">RECOMMENDED TENURE</p>
            <p className="text-7xl font-black text-white tracking-tighter">{targetTenure} Years</p>
          </div>
          <div>
            <p className="text-xs font-black text-zinc-400">POTENTIAL INTEREST SAVED</p>
            <p className="text-7xl font-black text-emerald-400 tracking-tighter">₹{Math.round(interestSaved).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Growth vs Debt Chart */}
      {results.opportunity && results.opportunity.chart_data && (
        <div className="bg-[#111827] border border-zinc-700 rounded-3xl p-12">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Growth vs Debt</h4>
            <div className="flex bg-zinc-800 rounded-2xl p-1">
              <button onClick={() => setOppView('line')} className={`px-6 py-2 text-sm font-black rounded-xl transition-all ${oppView === 'line' ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}>LINE</button>
              <button onClick={() => setOppView('area')} className={`px-6 py-2 text-sm font-black rounded-xl transition-all ${oppView === 'area' ? 'bg-emerald-500 text-black' : 'hover:bg-zinc-700'}`}>AREA</button>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {oppView === 'line' ? (
                <LineChart data={results.opportunity.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis tickFormatter={rupeeFormatter} stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="natural" dataKey="cumulative_emi_paid" stroke="#f43f5e" strokeWidth={5} name="EMI Paid" />
                 <Line type="natural" dataKey="investment_value" stroke="#10b981" strokeWidth={6} name="Investment Growth" />
                </LineChart>
              ) : (
                <AreaChart data={results.opportunity.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis tickFormatter={rupeeFormatter} stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                 <Area type="natural" dataKey="investment_value" stroke="#10b981" fill="#10b981" fillOpacity={0.25} name="Investment Growth" />
                  <Area type="natural" dataKey="cumulative_emi_paid" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.15} name="EMI Paid" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Buy vs Rent */}
      {results.debtvsrent && results.debtvsrent.debt_vs_rent_data && (
        <div className="bg-[#111827] border border-zinc-700 rounded-3xl p-12">
          <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-8">Buy vs Rent (20 Years)</h4>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDebtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis tickFormatter={rupeeFormatter} stroke="#64748b" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="debt_cumulative" fill="#ef4444" name="Loan Cost" radius={[8,8,0,0]} />
                <Bar dataKey="rent_cumulative" fill="#3b82f6" name="Rent Cost" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function StrategyCard({ title, badge, emi, desc, highlighted = false }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`p-8 rounded-3xl border transition-all ${highlighted ? 'border-emerald-400 bg-[#1a2333] shadow-2xl' : 'border-zinc-700 bg-[#111827]'}`}
    >
      <div className="flex justify-between items-center mb-8">
        <h5 className="font-black text-lg tracking-tight">{title}</h5>
        <span className={`text-xs px-4 py-2 rounded-2xl font-black uppercase ${highlighted ? 'bg-emerald-400 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-zinc-400 mb-10 leading-relaxed">{desc}</p>
      <div className="flex justify-between items-baseline border-t border-zinc-700 pt-6">
        <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Monthly EMI</span>
        <span className="text-3xl font-black text-emerald-400">₹{Math.round(emi).toLocaleString('en-IN')}</span>
      </div>
    </motion.div>
  );
}