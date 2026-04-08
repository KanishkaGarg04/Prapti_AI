import { useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import Chatbot from './components/ChatBot';

const API_BASE = 'http://localhost:8000';

// --- UPGRADED 4-CARD FEATURE GRID ---
const Features = () => {
  const features = [
    { 
      title: "Risk Scoring", 
      desc: "Neural assessment of debt-to-income stability and repayment bandwidth.", 
      icon: "🎯", 
      color: "from-emerald-500/20" 
    },
    { 
      title: "SIP Growth", 
      desc: "Calculate opportunity cost vs aggressive repayment with market simulations.", 
      icon: "📈", 
      color: "from-cyan-500/20" 
    },
    { 
      title: "Shock Labs", 
      desc: "Simulate job loss, interest rate hikes, or emergency medical expenses.", 
      icon: "⚡", 
      color: "from-amber-500/20" 
    },
    { 
      title: "Neural Delta", 
      desc: "Side-by-side comparison of different financial paths and debt strategies.", 
      icon: "🧠", 
      color: "from-purple-500/20" 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-24 px-4">
      {features.map((f, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="relative group p-8 bg-[#111827]/40 border border-zinc-800/50 rounded-[2.5rem] overflow-hidden transition-all hover:border-emerald-500/40 shadow-2xl"
        >
          {/* Animated Glow Backdrop */}
          <div className={`absolute inset-0 bg-gradient-to-br ${f.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            {/* Larger Icons */}
            <div className="text-4xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500 inline-block">
              {f.icon}
            </div>
            {/* Bold, Larger Font Sizes */}
            <h3 className="text-white font-black text-[13px] uppercase tracking-[0.25em] mb-4">
              {f.title}
            </h3>
            <p className="text-zinc-400 text-[14px] leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
              {f.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- RESTORED ORIGINAL HERO SECTION ---
const Hero = ({ onStart }) => (
  <section className="min-h-[95vh] flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
    {/* Ambient Background Elements */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10"
    >
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Neural Logic v2.0 Live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter">
        Master Your Debt. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-100 to-cyan-500">
          Before It Masters You.
        </span>
      </h1>

      <p className="max-w-2xl text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
        Prapti AI uses advanced neural models to analyze your financial resilience, 
        simulates market shocks, and builds a strategic roadmap to debt freedom.
      </p>
      
      <div className="pt-4">
        <button 
          onClick={onStart} 
          className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-emerald-500/20 uppercase tracking-[0.3em] text-[11px]"
        >
          Begin Neural Analysis
        </button>
      </div>
    </motion.div>

    <Features />
  </section>
);

// --- MAIN APP COMPONENT ---
function App() {
  const [formData, setFormData] = useState({
    loan_amount: 5000000,
    interest_rate: 8.5,
    tenure_years: 20,
    monthly_income: 80000,
    existing_emis: 15000,
    job_type: 'private',
  });

  const [results, setResults] = useState({ risk: null, optimize: null, opportunity: null, debtvsrent: null, shocks: null });
  const [savedResults, setSavedResults] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'job_type' ? value : (value === '' ? '' : Number(value)) }));
  }, []);

  const scrollToSection = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -120; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const runAnalysis = async (isComparison = false) => {
    if (loading) return;
    
    if (isComparison && results.risk) {
      setSavedResults({...results});
    } else if (!isComparison) {
      setSavedResults(null);
    }

    setLoading(true);
    try {
      const responses = await Promise.allSettled([
        axios.post(`${API_BASE}/api/calculate-risk`, formData),
        axios.post(`${API_BASE}/api/optimize-loan`, formData),
        axios.post(`${API_BASE}/api/opportunity-cost`, formData),
        axios.post(`${API_BASE}/api/debt-vs-rent`, formData),
        axios.post(`${API_BASE}/api/simulate-shocks`, formData),
      ]);
      
      const getPayload = (res) => (res.status === 'fulfilled' ? res.value.data : null);
      
      const newResults = { 
        risk: getPayload(responses[0]), 
        optimize: getPayload(responses[1]), 
        opportunity: getPayload(responses[2]), 
        debtvsrent: getPayload(responses[3]), 
        shocks: getPayload(responses[4]) 
      };

      setResults(newResults);
      setTimeout(() => scrollToSection('results-anchor'), 300);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setLoading(false); 
    }
  };

  const getDelta = (newVal, oldVal) => {
    const diff = (newVal || 0) - (oldVal || 0);
    if (diff === 0) return { text: "No Change", color: "text-zinc-500" };
    return {
      text: `${diff > 0 ? '+' : ''}${Math.round(diff).toLocaleString()}`,
      color: diff < 0 ? "text-emerald-400" : "text-rose-400"
    };
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-zinc-400 selection:bg-emerald-500/30 font-sans">
      <nav className="fixed top-0 left-0 w-full h-16 border-b border-zinc-800/20 bg-[#0b0f19]/80 backdrop-blur-xl z-[100]">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-black font-black text-[10px]">P</div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Prapti AI</span>
          </div>
        </div>
      </nav>

      <main className={`mx-auto px-6 pt-10 pb-32 transition-all duration-700 ${savedResults ? 'max-w-[1800px]' : 'max-w-[1400px]'}`}>
        <Hero onStart={() => scrollToSection('app-core')} />

        <div id="app-core" className="space-y-16 scroll-mt-32">
          <section className="max-w-4xl mx-auto bg-[#111827]/20 border border-zinc-800/40 rounded-[3rem] p-10 backdrop-blur-sm shadow-2xl">
             <InputForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                calculateRisk={() => runAnalysis(false)} 
                onSave={() => runAnalysis(true)} 
                loading={loading} 
             />
          </section>

          <div id="results-anchor" className="min-h-[400px] w-full pt-10">
            {savedResults ? (
              <div className="space-y-12">
                <div className="sticky top-20 z-[90] bg-[#0b0f19]/90 backdrop-blur-md border border-emerald-500/20 p-4 rounded-2xl flex justify-around items-center max-w-2xl mx-auto shadow-2xl">
                    <div className="text-center">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">EMI Variance</p>
                      <p className={`text-sm font-black ${getDelta(results.risk?.emi_monthly, savedResults.risk?.emi_monthly).color}`}>
                        {getDelta(results.risk?.emi_monthly, savedResults.risk?.emi_monthly).text}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Risk Variance</p>
                      <p className={`text-sm font-black ${getDelta(results.risk?.risk_score, savedResults.risk?.risk_score).color}`}>
                        {getDelta(results.risk?.risk_score, savedResults.risk?.risk_score).text}
                      </p>
                    </div>
                    <button onClick={() => setSavedResults(null)} className="px-4 py-1.5 bg-rose-500/10 text-rose-500 text-[8px] font-black rounded-lg uppercase border border-rose-500/20 transition-all hover:bg-rose-500/20">Discard Compare</button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 justify-center opacity-50"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Scenario A (Baseline)</span></div>
                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-4 grayscale opacity-80 shadow-inner">
                      <ResultsDashboard results={savedResults} formData={formData} isComparison={true} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 justify-center"><span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Scenario B (Live)</span></div>
                    <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[2.5rem] p-4 shadow-2xl">
                      <ResultsDashboard results={results} formData={formData} isComparison={true} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              results.risk && (
                <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
                  <ResultsDashboard results={results} formData={formData} isComparison={false} />
                </div>
              )
            )}
          </div>
        </div>
      </main>

      {/* Floating Chatbot */}
      <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-[380px] h-[520px] bg-[#0b0f19] border border-zinc-800 shadow-2xl rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/40 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Neural Strategist</span>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-600 hover:text-white transition-colors">✕</button>
              </div>
              <Chatbot results={results} />
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95">
          {isChatOpen ? '✕' : '💬'}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-[#0b0f19]/90 backdrop-blur-md z-[300] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.5em] animate-pulse">Computing Future State...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;