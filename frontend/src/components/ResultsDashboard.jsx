import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Area, AreaChart 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0f19] border border-zinc-800 rounded-lg p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2">Year {label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex justify-between items-center gap-6 py-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-[11px] text-zinc-300">{entry.name}</span>
            </div>
            <span className="text-[11px] font-bold text-white">₹{entry.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const rupeeFormatter = (value) => `₹${(value / 100000).toFixed(1)}L`;

export default function ResultsDashboard({ results, formData }) {
  const [oppView, setOppView] = useState('line');
  const [showYears, setShowYears] = useState(20);
  const [showStressTest, setShowStressTest] = useState(false);

  // Fallback for empty results
  if (!results || (!results.risk && !results.optimize)) {
    return (
      <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/10">
        <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.3em]">
          Awaiting Analysis Input...
        </p>
      </div>
    );
  }

  const filteredDebtData = results.debtvsrent?.debt_vs_rent_data?.slice(0, showYears) || [];

  // Robust data normalization for shocks - matches the normalization in App.jsx
  const shockScenarios = results.shocks?.scenarios || (Array.isArray(results.shocks) ? results.shocks : null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-12 pb-20"
    >
      {/* --- 1. STRATEGY & RISK SECTION --- */}
      <div id="risk-section" className="scroll-mt-24 space-y-8">
        {results.risk && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StrategyCard 
                title="Conservative" 
                rate="8.5%" 
                emi={results.risk.emi_monthly * 0.9} 
                stress="Lowest Risk" 
                desc="Prioritizes long-term safety and minimal monthly burden."
              />
              <StrategyCard 
                title="Balanced" 
                rate="9.2%" 
                emi={results.risk.emi_monthly} 
                stress="Recommended" 
                desc="Optimal balance between interest cost and liquidity."
                highlighted 
              />
              <StrategyCard 
                title="Aggressive" 
                rate="10.5%" 
                emi={results.risk.emi_monthly * 1.3} 
                stress="High Savings" 
                desc="Aggressive repayment to minimize total interest paid."
              />
            </div>

            <div className="bg-[#111827] border border-zinc-800/60 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="text-center md:border-r md:border-zinc-800 md:pr-12">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Risk Score</h3>
                <div className={`text-7xl font-black tracking-tighter ${
                  results.risk.risk?.color === 'green' ? 'text-emerald-500' : 
                  results.risk.risk?.color === 'yellow' ? 'text-amber-500' : 'text-rose-500'
                }`}>
                  {results.risk.risk?.risk_score || 'N/A'}
                </div>
                <div className="text-[11px] font-bold uppercase mt-1 tracking-tighter text-zinc-300">
                  {results.risk.risk?.category || 'Analyzing'}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-400 leading-relaxed max-w-lg italic">
                  "{results.risk.risk?.explanation || "Calculating your financial safety margins..."}"
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- 2. FINANCIAL SHOCK SIMULATOR --- */}
      <div id="stress-test-section" className={`scroll-mt-24 transition-all duration-500 rounded-2xl p-6 border ${
        showStressTest 
          ? 'bg-rose-950/10 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)]' 
          : 'bg-[#111827]/50 border-zinc-800/60'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className={`text-[10px] font-bold uppercase tracking-widest ${showStressTest ? 'text-rose-400' : 'text-zinc-500'}`}>
              {showStressTest ? "🚨 Live Stress Simulation" : "Resilience Stress Test"}
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">
              {showStressTest ? "Analyzing portfolio under extreme conditions..." : "Simulate life shocks and market volatility"}
            </p>
          </div>
          <button 
            onClick={() => setShowStressTest(!showStressTest)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all border ${
              showStressTest 
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
              : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
            }`}
          >
            {showStressTest ? "DEACTIVATE PANIC MODE" : "⚡ RUN STRESS TEST"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showStressTest && (
            <motion.div 
              key="stress-grid"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {shockScenarios ? (
                  shockScenarios.map((shock, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border ${shock.safe ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/10'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase">{shock.type || 'Shock Scenario'}</span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${
                          shock.risk_level === 'Safe' ? 'bg-emerald-500/10 text-emerald-500' : 
                          shock.risk_level === 'Risky' || shock.risk_level === 'Warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {(shock.risk_level || 'Alert').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-200 font-bold mb-1">
                        {shock.new_income ? `₹${Math.round(shock.new_income).toLocaleString()}/mo` : 
                         shock.new_rate ? `${shock.new_rate}% ROI/Rate` : `Impact Analysis`}
                      </p>
                      <p className="text-[10px] text-zinc-500 leading-relaxed italic line-clamp-3">
                        "{shock.message || "Calculating impact..."}"
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 py-10 text-center border border-dashed border-rose-500/20 rounded-xl">
                    <p className="text-[10px] text-rose-500 uppercase animate-pulse font-bold">Initializing Stress Engine...</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- 3. OPTIMIZATION SECTION --- */}
      <div id="optimize-section" className="scroll-mt-24 bg-[#111827] border border-zinc-800/60 rounded-xl p-6">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Optimization Engine</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#0b0f19] rounded-lg border border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Recommended Tenure</p>
              <p className="text-2xl font-bold text-white">{results.optimize?.recommended_tenure_years || '--'} Years</p>
            </div>
            <div className="p-4 bg-[#0b0f19] rounded-lg border border-emerald-500/20">
              <p className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Potential Interest Saved</p>
              <p className="text-2xl font-bold text-emerald-400">₹{results.optimize?.interest_saved?.toLocaleString('en-IN') || '0'}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-emerald-500 pl-4">
              {results.optimize?.explanation || "Optimization strategies derived from your current DTI and income stability."}
            </p>
          </div>
        </div>
      </div>

      {/* --- 4. CHARTS SECTION --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Opportunity Cost */}
        <div id="opportunity-section" className="scroll-mt-24 bg-[#111827] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Growth vs Debt</h4>
            <div className="flex bg-[#0b0f19] rounded-md p-0.5 border border-zinc-800">
              <button onClick={() => setOppView('line')} className={`px-3 py-1 rounded text-[9px] font-bold transition-all ${oppView === 'line' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>LINE</button>
              <button onClick={() => setOppView('area')} className={`px-3 py-1 rounded text-[9px] font-bold transition-all ${oppView === 'area' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>AREA</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {oppView === 'line' ? (
                <LineChart data={results.opportunity?.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="year" fontSize={9} tickMargin={10} stroke="#4b5563" />
                  <YAxis tickFormatter={rupeeFormatter} fontSize={9} stroke="#4b5563" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="cumulative_emi_paid" stroke="#ef4444" strokeWidth={2} dot={false} name="EMI Paid" />
                  <Line type="monotone" dataKey="investment_value" stroke="#10b981" strokeWidth={2} dot={false} name="SIP Value" />
                </LineChart>
              ) : (
                <AreaChart data={results.opportunity?.chart_data}>
                  <defs>
                    <linearGradient id="colorSIP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="year" fontSize={9} stroke="#4b5563" />
                  <YAxis tickFormatter={rupeeFormatter} fontSize={9} stroke="#4b5563" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="investment_value" stroke="#10b981" fillOpacity={1} fill="url(#colorSIP)" name="SIP Value" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Debt vs Rent */}
        <div id="rent-section" className="scroll-mt-24 bg-[#111827] border border-zinc-800/60 rounded-xl p-5">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Buy vs Rent</h4>
            <div className="flex gap-2">
              {[10, 20].map(y => (
                <button key={y} onClick={() => setShowYears(y)} className={`text-[9px] font-bold px-2 py-1 rounded border ${showYears === y ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-zinc-800 text-zinc-500'}`}>
                  {y}Y
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredDebtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="year" fontSize={9} stroke="#4b5563" />
                <YAxis tickFormatter={rupeeFormatter} fontSize={9} stroke="#4b5563" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="debt_cumulative" fill="#ef4444" name="Loan Cost" radius={[2, 2, 0, 0]} barSize={8} />
                <Bar dataKey="rent_cumulative" fill="#3b82f6" name="Rent Cost" radius={[2, 2, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StrategyCard({ title, rate, emi, stress, desc, highlighted }) {
  return (
    <motion.div 
      whileHover={{ y: -4, borderColor: highlighted ? '#10b981' : '#3f3f46' }}
      className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
        highlighted ? 'bg-[#1a2333] border-emerald-500/40 shadow-lg shadow-emerald-950/20' : 'bg-[#111827] border-zinc-800/60'
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-[11px] font-bold text-zinc-100 uppercase tracking-tighter">{title}</h5>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-sm font-bold uppercase ${highlighted ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
            {stress}
          </span>
        </div>
        <p className="text-[10px] text-zinc-500 mb-4 leading-tight">{desc}</p>
        <div className="space-y-1.5 border-t border-zinc-800/50 pt-3">
          <div className="flex justify-between text-[11px]"><span className="text-zinc-500 font-medium">ROI</span> <span className="text-zinc-200">{rate}</span></div>
          <div className="flex justify-between text-[11px]"><span className="text-zinc-500 font-medium">EMI</span> <span className="text-emerald-400 font-bold">₹{Math.round(emi).toLocaleString('en-IN')}</span></div>
        </div>
      </div>
    </motion.div>
  );
}