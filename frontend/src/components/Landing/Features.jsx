import { motion } from 'framer-motion';

const Features = () => {
  const feats = [
    { 
      title: "Stress Simulation", 
      desc: "Simulate 30% income drops or 2% rate hikes instantly. See exactly how your cash flow holds up against sudden market volatility.", 
      icon: "📉",
      color: "from-emerald-500/20"
    },
    { 
      title: "Interest Optimization", 
      desc: "Our neural logic identifies the mathematical 'Sweet Spot' between your monthly EMI and total bank interest to save you lakhs.", 
      icon: "🎯",
      color: "from-cyan-500/20"
    },
    { 
      title: "Opportunity Cost", 
      desc: "Stop viewing debt in isolation. Compare your loan interest against the potential gains of a 12% SIP investment in real-time.", 
      icon: "💰",
      color: "from-blue-500/20"
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background glow to fill the "empty space" behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-10 relative z-10">
        {feats.map((f, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-10 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/40 transition-all duration-500 overflow-hidden"
          >
            {/* Corner Gradient Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${f.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="text-5xl mb-8 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 inline-block">
                {f.icon}
              </div>
              
              <h3 className="text-white font-black text-2xl mb-4 tracking-tight">
                {f.title}
              </h3>
              
              <p className="text-zinc-500 leading-relaxed font-medium text-base tracking-wide group-hover:text-zinc-400 transition-colors">
                {f.desc}
              </p>
            </div>

            {/* Subtle bottom-right accent */}
            <div className="absolute bottom-6 right-8 text-zinc-800 font-black text-4xl italic opacity-10 group-hover:opacity-20 transition-opacity select-none">
              0{i + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;