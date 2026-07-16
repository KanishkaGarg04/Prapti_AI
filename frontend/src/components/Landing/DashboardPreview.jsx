import { motion } from 'framer-motion';

export const Hero = ({ onStart }) => (
  <section className="min-h-[85vh] flex items-center justify-center py-24 px-6 relative overflow-hidden">
    {/* Background Decorative Blurs - These fill the "empty" void in your screenshot */}
    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-12 relative z-10"
    >
      {/* Badge with extreme letter spacing */}
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[11px] font-black uppercase tracking-[0.4em]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Neural Logic v1.0 Live
      </div>
      
      {/* Title with tracking-tighter for a modern premium feel */}
      <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
        Master Your Debt. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-cyan-500">
          Before It Masters You.
        </span>
      </h1>
      
      {/* Increased line-height (leading-relaxed) and wider max-width to eat up space */}
      <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide">
        Traditional calculators ignore real-world volatility. Our high-fidelity engine 
        simulates market shocks and opportunity costs to build your path to absolute financial freedom.
      </p>

      <div className="flex flex-col items-center gap-10 pt-4">
        <button 
          onClick={onStart}
          className="px-12 py-6 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-full transition-all hover:scale-105 shadow-[0_0_50px_rgba(16,185,129,0.25)] uppercase tracking-[0.2em] text-sm"
        >
          Begin Neural Analysis
        </button>

        {/* New "Trust/Metric" Row - Fills the empty space below the button */}
        <div className="flex items-center gap-12 opacity-30 pt-12">
           <div className="text-center">
              <div className="text-white font-bold text-xl tracking-tighter">256-bit</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold">Secure</div>
           </div>
           <div className="h-10 w-[1px] bg-zinc-800" />
           <div className="text-center">
              <div className="text-white font-bold text-xl tracking-tighter">FastAPI</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold">Logic</div>
           </div>
           <div className="h-10 w-[1px] bg-zinc-800" />
           <div className="text-center">
              <div className="text-white font-bold text-xl tracking-tighter">Real-time</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold">Simulation</div>
           </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export const Features = () => {
  const feats = [
    { title: "Stress Simulation", desc: "Simulate 30% income drops or 2% rate hikes instantly to test your survival.", icon: "📉" },
    { title: "Interest Optimization", desc: "Our neural logic finds the mathematical 'Sweet Spot' for your EMI.", icon: "🎯" },
    { title: "Opportunity Cost", desc: "Compare your debt interest against 12% SIP returns in real-time.", icon: "💰" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-10 pb-32">
      {feats.map((f, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="p-10 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
        >
          {/* Subtle hover glow for each card */}
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</div>
          <h3 className="text-white font-bold text-xl mb-3 tracking-tight">{f.title}</h3>
          <p className="text-zinc-500 leading-relaxed font-medium">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};