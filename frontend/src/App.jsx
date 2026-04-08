import { useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import Chatbot from './components/ChatBot';

const API_BASE = 'http://localhost:8000';

const Features = () => {
  const features = [
    { title: "Risk Scoring", desc: "Neural assessment of debt-to-income stability.", icon: "🎯", color: "from-emerald-500/20" },
    { title: "Optimization", desc: "AI-driven adjustments to minimize total interest.", icon: "⚙️", color: "from-cyan-500/20" },
    { title: "Buy vs Rent", desc: "Comparative analysis of acquisition vs rental.", icon: "🏠", color: "from-amber-500/20" },
    { title: "Neural Delta", desc: "Side-by-side comparison of financial paths.", icon: "🧠", color: "from-purple-500/20" }
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
          <div className={`absolute inset-0 bg-gradient-to-br ${f.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative z-10">
            <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500">{f.icon}</div>
            <h3 className="text-white font-black text-[14px] uppercase tracking-[0.25em] mb-4">{f.title}</h3>
            <p className="text-zinc-400 text-[15px] leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Hero = ({ onStart }) => (
  <section className="min-h-[95vh] flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Neural Logic v2.0 Live
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter">
        Master Your Debt. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-100 to-cyan-500">Before It Masters You.</span>
      </h1>
      <p className="max-w-2xl text-zinc-500 text-lg md:text-xl font-medium leading-relaxed"> Strategic roadmap to debt freedom via Prapti AI. </p>
      <div className="pt-4">
        <button onClick={onStart} className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-emerald-500/20 uppercase tracking-[0.3em] text-[11px]">Begin Neural Analysis</button>
      </div>
    </motion.div>
    <Features />
  </section>
);

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
        const offset = 140; 
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    }, 100);
  };

  // UPDATED: Standardized runAnalysis to handle the isComparison flag correctly
  const runAnalysis = async (isComparison = false) => {
    if (loading) return;
    
    // If comparing, store current results into savedResults before getting new ones
    if (isComparison && results.risk) {
      setSavedResults(JSON.parse(JSON.stringify(results))); 
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
      
      setResults({ 
        risk: getPayload(responses[0]), 
        optimize: getPayload(responses[1]), 
        opportunity: getPayload(responses[2]), 
        debtvsrent: getPayload(responses[3]), 
        shocks: getPayload(responses[4]) 
      });

      setTimeout(() => scrollToSection('results-anchor'), 300);
    } catch (err) { 
      console.error("Analysis Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  const getDelta = (newObj, oldObj, type) => {
    const newVal = type === 'emi' 
      ? (newObj?.risk?.emi_monthly || newObj?.emi_monthly || 0)
      : (newObj?.risk?.risk_score || newObj?.risk_score || 0);
      
    const oldVal = type === 'emi' 
      ? (oldObj?.risk?.emi_monthly || oldObj?.emi_monthly || 0)
      : (oldObj?.risk?.risk_score || oldObj?.risk_score || 0);

    const n = Number(newVal) || 0;
    const o = Number(oldVal) || 0;
    const diff = n - o;
    
    if (diff === 0) return { text: "No Variance", color: "text-zinc-500", percent: "" };
    
    const pct = o !== 0 ? `(${((diff / o) * 100).toFixed(1)}%)` : "";
    return {
      text: `${diff > 0 ? '+' : ''}${Math.round(diff).toLocaleString('en-IN')}`,
      color: diff < 0 ? "text-emerald-400" : "text-rose-400",
      percent: pct
    };
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-zinc-400 font-sans selection:bg-emerald-500/30">
      <nav className="fixed top-0 w-full h-16 border-b border-zinc-800/20 bg-[#0b0f19]/80 backdrop-blur-xl z-[100]">
        <div className="max-w-7xl mx-auto h-full flex items-center px-8">
            <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-black font-black text-[10px] mr-3">P</div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Prapti AI</span>
        </div>
      </nav>

      <main className={`mx-auto px-6 pt-10 pb-32 transition-all duration-700 ${savedResults ? 'max-w-[1800px]' : 'max-w-[1200px]'}`}>
        <Hero onStart={() => scrollToSection('app-core')} />

        <div id="app-core" className="space-y-16">
          <section className="max-w-4xl mx-auto bg-[#111827]/20 border border-zinc-800/40 rounded-[3rem] p-10 backdrop-blur-sm shadow-2xl">
             <InputForm 
               formData={formData} 
               handleInputChange={handleInputChange} 
               calculateRisk={(isCompare) => runAnalysis(isCompare)} // FIXED: Passing the flag from InputForm
               loading={loading} 
             />
          </section>

          <div id="results-anchor" className="min-h-[400px] w-full pt-10">
            {savedResults ? (
              <div className="space-y-12 animate-in fade-in duration-700">
                <div className="sticky top-20 z-[90] bg-[#0b0f19]/90 backdrop-blur-md border border-emerald-500/20 p-5 rounded-3xl flex flex-wrap justify-around items-center max-w-4xl mx-auto shadow-2xl gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">Differential Mode Active</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">EMI Δ</p>
                      <div className={`text-sm font-black ${getDelta(results.risk, savedResults.risk, 'emi').color}`}>
                        {getDelta(results.risk, savedResults.risk, 'emi').text}
                        <span className="text-[9px] ml-1 opacity-60 font-medium">{getDelta(results.risk, savedResults.risk, 'emi').percent}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Risk Δ</p>
                      <div className={`text-sm font-black ${getDelta(results.risk, savedResults.risk, 'risk').color}`}>
                        {getDelta(results.risk, savedResults.risk, 'risk').text}
                      </div>
                    </div>

                    <button onClick={() => setSavedResults(null)} className="px-5 py-2 bg-rose-500/10 text-rose-500 text-[9px] font-black rounded-xl uppercase border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all">Clear Comparison</button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="text-center mb-4">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Scenario A (Stored)</span>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] p-8">
                      <ResultsDashboard results={savedResults} storedResults={null} isComparisonMode={true} formData={formData} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-center mb-4">
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Scenario B (Live)</span>
                    </div>
                    <div className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-[2.5rem] p-8 shadow-2xl shadow-emerald-500/10 relative">
                      <ResultsDashboard results={results} storedResults={savedResults} isComparisonMode={true} formData={formData} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              results.risk && (
                <div className="max-w-6xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
                  <ResultsDashboard results={results} storedResults={null} isComparisonMode={false} formData={formData} />
                </div>
              )
            )}
          </div>
        </div>
      </main>

      {/* CHATBOT */}
      <div className="fixed bottom-8 right-8 z-[200]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-[380px] h-[520px] bg-[#0b0f19] border border-zinc-800 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl mb-4"
            >
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/40 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Neural Strategist</span>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-600 hover:text-white transition-colors">✕</button>
              </div>
              <Chatbot results={results} />
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)} 
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-90"
        >
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