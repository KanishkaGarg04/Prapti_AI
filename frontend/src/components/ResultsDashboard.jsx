import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Area, AreaChart 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0f19] border border-zinc-800 rounded-xl p-4 shadow-2xl backdrop-blur-md">
        <p className="text-xs text-zinc-500 uppercase font-black mb-3 tracking-widest">Year {label}</p>
        {payload.map((entry, i) => (
          <div key={i} className="flex justify-between items-center gap-8 py-1.5">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-sm text-zinc-300 font-medium">{entry.name}</span>
            </div>
            <span className="text-sm font-black text-white">₹{entry.value.toLocaleString('en-IN')}</span>
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

  const instanceKey = useMemo(() => JSON.stringify(results?.risk?.emi_monthly), [results]);

  if (!results || (!results.risk && !results.optimize)) {
    return (
      <div className="py-24 text-center border border-dashed border-zinc-800 rounded-[2.5rem] bg-zinc-900/10">
        <p className="text-xs text-zinc-600 uppercase font-black tracking-[0.4em]">
          Awaiting Neural Analysis Input...
        </p>
      </div>
    );
  }

  const filteredDebtData = results.debtvsrent?.debt_vs_rent_data?.slice(0, showYears) || [];
  const shockScenarios = results.shocks?.scenarios || (Array.isArray(results.shocks) ? results.shocks : null);

  return (
    <motion.div 
      key={instanceKey}
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-16 pb-20"
    >
      {/* --- 1. STRATEGY & RISK SECTION --- */}
      {/* ID MATCHED TO APP.JSX NAV: risk-metrics */}
      <div id="risk-metrics" className="scroll-mt-32 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StrategyCard 
            title="Conservative" 
            rate={`${formData.interest_rate}%`} 
            emi={results.risk.emi_monthly} 
            stress="Current Baseline" 
            desc="The standard repayment schedule based on your current inputs." 
          />
          <StrategyCard 
            title="Optimized" 
            rate={`${formData.interest_rate}%`} 
            emi={results.optimize?.recommended_emi || results.risk.emi_monthly} 
            stress="Neural Choice" 
            desc={results.optimize?.explanation?.slice(0, 60) + "..." || "Optimal balance between interest cost and liquidity."} 
            highlighted 
          />
          <StrategyCard 
            title="Aggressive" 
            rate={`${formData.interest_rate}%`} 
            emi={results.risk.emi_monthly * 1.25} 
            stress="+25% Repayment" 
            desc="Calculates impact if you voluntarily increase your monthly outflow." 
          />
        </div>

        <div className="bg-[#111827] border border-zinc-800/60 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-12 shadow-sm">
          <div className="text-center md:border-r md:border-zinc-800 md:pr-16">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Risk Score</h3>
            <div className={`text-8xl font-black tracking-tighter ${results.risk.risk?.color === 'green' ? 'text-emerald-500' : results.risk.risk?.color === 'yellow' ? 'text-amber-500' : 'text-rose-500'}`}>
              {results.risk.risk?.risk_score || 'N/A'}
            </div>
            <div className="text-sm font-black uppercase mt-2 tracking-widest text-zinc-300">{results.risk.risk?.category || 'Analyzing'}</div>
          </div>
          <div className="flex-1 italic text-lg text-zinc-400 font-medium leading-relaxed">
            "{results.risk.risk?.explanation || "Calculating your financial safety margins..."}"
          </div>
        </div>
      </div>

      {/* --- 2. GROWTH / OPPORTUNITY SECTION --- */}
      {/* ID MATCHED TO APP.JSX NAV: growth-sip */}
      <div id="growth-sip" className="scroll-mt-32 space-y-12">
        <div className="bg-[#111827] border border-zinc-800/60 rounded-[3rem] p-10">
          <div className="flex justify-between items-center mb-10 text-center md:text-left">
            <div>
              <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.4em]">Growth vs Debt</h4>
              <p className="text-zinc-400 mt-2 font-medium italic text-sm">Long-term capital trajectory</p>
            </div>
            <div className="flex bg-[#0b0f19] rounded-xl p-1 border border-zinc-800">
              <button onClick={() => setOppView('line')} className={`px-4 md:px-6 py-2.5 rounded-lg text-xs font-black transition-all ${oppView === 'line' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>LINE</button>
              <button onClick={() => setOppView('area')} className={`px-4 md:px-6 py-2.5 rounded-lg text-xs font-black transition-all ${oppView === 'area' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>AREA</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {oppView === 'line' ? (
                <LineChart data={results.opportunity?.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="year" fontSize={10} tickMargin={15} stroke="#4b5563" fontWeight={800} />
                  <YAxis tickFormatter={rupeeFormatter} fontSize={10} stroke="#4b5563" fontWeight={800} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="cumulative_emi_paid" stroke="#ef4444" strokeWidth={4} dot={false} name="EMI Paid" />
                  <Line type="monotone" dataKey="investment_value" stroke="#10b981" strokeWidth={4} dot={false} name="SIP Value" />
                </LineChart>
              ) : (
                <AreaChart data={results.opportunity?.chart_data}>
                  <defs>
                    <linearGradient id="colorSIP" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="year" fontSize={10} stroke="#4b5563" fontWeight={800} />
                  <YAxis tickFormatter={rupeeFormatter} fontSize={10} stroke="#4b5563" fontWeight={800} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="investment_value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSIP)" name="SIP Value" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- 3. BUY VS RENT SECTION --- */}
      {/* ID MATCHED TO APP.JSX NAV: buy-vs-rent */}
      <div id="buy-vs-rent" className="scroll-mt-32 bg-[#111827] border border-zinc-800/60 rounded-[3rem] p-10">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.4em]">Buy vs Rent Analysis</h4>
            <p className="text-zinc-400 mt-2 font-medium italic text-sm">Cumulative expense comparison</p>
          </div>
          <div className="flex gap-2">
            {[10, 20, 30].map(y => (
              <button key={y} onClick={() => setShowYears(y)} className={`text-[10px] font-black px-4 py-2 rounded-xl border transition-all ${showYears === y ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : 'border-zinc-800 text-zinc-500'}`}>
                {y}Y
              </button>
            ))}
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredDebtData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="year" fontSize={10} stroke="#4b5563" fontWeight={800} />
              <YAxis tickFormatter={rupeeFormatter} fontSize={10} stroke="#4b5563" fontWeight={800} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="debt_cumulative" fill="#ef4444" name="Loan Cost" radius={[4, 4, 0, 0]} barSize={15} />
              <Bar dataKey="rent_cumulative" fill="#3b82f6" name="Rent Cost" radius={[4, 4, 0, 0]} barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- 4. OPTIMIZATION SUMMARY --- */}
      <div className="bg-gradient-to-br from-[#111827] to-[#0b0f19] border border-zinc-800/60 rounded-[3rem] p-12">
        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Neural Optimization</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-8 bg-zinc-950/50 rounded-[2rem] border border-zinc-800">
              <p className="text-xs text-zinc-500 uppercase font-black mb-3 tracking-widest text-center md:text-left">Recommended Tenure</p>
              <p className="text-4xl md:text-5xl font-black text-white text-center md:text-left">{results.optimize?.recommended_tenure_years || '--'} <span className="text-2xl text-zinc-600">Years</span></p>
            </div>
            <div className="p-8 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/20">
              <p className="text-xs text-emerald-500 uppercase font-black mb-3 tracking-widest text-center md:text-left">Potential Interest Saved</p>
              <p className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight text-center md:text-left">₹{results.optimize?.interest_saved?.toLocaleString('en-IN') || '0'}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-lg text-zinc-400 leading-relaxed italic border-l-4 border-emerald-500 pl-10 font-medium">
              {results.optimize?.explanation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StrategyCard({ title, rate, emi, stress, desc, highlighted }) {
  return (
    <motion.div 
      whileHover={{ y: -5, borderColor: highlighted ? '#10b981' : '#52525b' }}
      className={`p-8 rounded-[2.5rem] border transition-all flex flex-col justify-between ${highlighted ? 'bg-[#1a2333] border-emerald-500/40 shadow-2xl shadow-emerald-950/40' : 'bg-[#111827] border-zinc-800/60'}`}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-base font-black text-zinc-100 uppercase tracking-[0.2em]">{title}</h5>
          <span className={`text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-tighter ${highlighted ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
            {stress}
          </span>
        </div>
        <p className="text-sm text-zinc-500 mb-10 leading-relaxed font-medium">{desc}</p>
        <div className="space-y-4 border-t border-zinc-800/80 pt-8">
          <div className="flex justify-between text-base">
            <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">ROI</span> 
            <span className="text-zinc-100 font-bold">{rate}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Monthly EMI</span> 
            <span className="text-2xl text-emerald-400 font-black tracking-tight">₹{Math.round(emi).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}