import { motion } from 'framer-motion';

export const Hero = ({ onStart }) => (
  <section className="py-20 px-6 text-center relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Neural Engine v1.0 Live
      </div>
      
      <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
        Master Your Debt. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          Before It Masters You.
        </span>
      </h1>
      
      <p className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
        Stop using basic calculators. Use a high-fidelity resilience engine to simulate market shocks, optimize interest, and escape the debt trap.
      </p>

      <div className="pt-4">
        <button 
          onClick={onStart}
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-emerald-500/20"
        >
          Begin Neural Analysis
        </button>
      </div>
    </motion.div>
  </section>
);

export const Features = () => {
  const feats = [
    { title: "Stress Simulation", desc: "Simulate 30% income drops or 2% rate hikes instantly.", icon: "📉" },
    { title: "Interest Optimization", desc: "Our logic finds the 'Sweet Spot' between EMI and Bank profit.", icon: "🎯" },
    { title: "Opportunity Cost", desc: "See what your EMI would become if invested in an SIP.", icon: "💰" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 pb-20">
      {feats.map((f, i) => (
        <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-emerald-500/30 transition-colors">
          <div className="text-2xl mb-3">{f.icon}</div>
          <h3 className="text-white font-bold mb-2">{f.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};