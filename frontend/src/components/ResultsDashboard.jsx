import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Area, AreaChart 
} from 'recharts';

// Compact Tooltip for high-density UI
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

export default function ResultsDashboard({ results }) {
  const [oppView, setOppView] = useState('line');
  const [showYears, setShowYears] = useState(20);

  if (!results.risk) return null;

  const filteredDebtData = results.debtvsrent?.debt_vs_rent_data?.slice(0, showYears) || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-12 pb-20"
    >
      
      {/* 1. Strategy Cards & Risk Hero (Commonly viewed together) */}
      <div id="risk-section" className="scroll-mt-24 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StrategyCard 
            title="Conservative" 
            rate="8.5%" 
            emi={results.risk.emi_monthly * 0.9} 
            stress="Lowest Risk" 
            desc="Prioritizes long-term safety."
          />
          <StrategyCard 
            title="Balanced" 
            rate="9.2%" 
            emi={results.risk.emi_monthly} 
            stress="Recommended" 
            desc="Best interest-to-risk ratio."
            highlighted 
          />
          <StrategyCard 
            title="Aggressive" 
            rate="10.5%" 
            emi={results.risk.emi_monthly * 1.3} 
            stress="High Savings" 
            desc="Clears debt 40% faster."
          />
        </div>

        {/* Risk Hero */}
        <div className="bg-[#111827] border border-zinc-800/60 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="text-center md:border-r md:border-zinc-800 md:pr-12">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Risk Score</h3>
            <div className={`text-7xl font-black tracking-tighter ${
              results.risk.risk.color === 'green' ? 'text-emerald-500' : 
              results.risk.risk.color === 'yellow' ? 'text-amber-500' : 'text-rose-500'
            }`}>
              {results.risk.risk.risk_score}
            </div>
            <div className="text-[11px] font-bold uppercase mt-1 tracking-tighter text-zinc-300">{results.risk.risk.category}</div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-zinc-400 leading-relaxed max-w-lg italic">"{results.risk.risk.explanation}"</p>
          </div>
        </div>
      </div>

      {/* 2. Optimization Section (ID matches InputForm button) */}
      <div id="optimize-section" className="scroll-mt-24 bg-[#111827] border border-zinc-800/60 rounded-xl p-6">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Loan Optimization Engine</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                  <div className="p-4 bg-[#0b0f19] rounded-lg border border-zinc-800">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Recommended Tenure</p>
                      <p className="text-2xl font-bold text-white">{results.optimize?.recommended_tenure_years} Years</p>
                  </div>
                  <div className="p-4 bg-[#0b0f19] rounded-lg border border-emerald-500/20">
                      <p className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Potential Interest Saved</p>
                      <p className="text-2xl font-bold text-emerald-400">₹{results.optimize?.interest_saved?.toLocaleString('en-IN')}</p>
                  </div>
              </div>
              <div className="flex items-center">
                  <p className="text-xs text-zinc-400 leading-relaxed italic border-l-2 border-emerald-500 pl-4">
                      {results.optimize?.explanation}
                  </p>
              </div>
          </div>
      </div>

      {/* 3. Opportunity Cost (ID matches InputForm button) */}
      <div id="opportunity-section" className="scroll-mt-24 bg-[#111827] border border-zinc-800/60 rounded-xl p-5">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Growth vs Debt (Opportunity Cost)</h4>
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
                  <linearGradient id="colorSIP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
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

      {/* 4. Debt vs Rent (ID matches InputForm button) */}
      <div id="rent-section" className="scroll-mt-24 bg-[#111827] border border-zinc-800/60 rounded-xl p-5">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Buy vs Rent Cost Analysis</h4>
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

    </motion.div>
  );
}

// Strategy Card Sub-component
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
          <div className="flex justify-between text-[11px]"><span className="text-zinc-500 font-medium">Interest Rate</span> <span className="text-zinc-200">{rate}</span></div>
          <div className="flex justify-between text-[11px]"><span className="text-zinc-500 font-medium">Monthly EMI</span> <span className="text-emerald-400 font-bold">₹{Math.round(emi).toLocaleString('en-IN')}</span></div>
        </div>
      </div>
    </motion.div>
  );
}