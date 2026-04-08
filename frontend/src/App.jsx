import { useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import Chatbot from './components/ChatBot';

const API_BASE = 'http://localhost:8000';

// --- LANDING SUB-COMPONENTS ---
const Hero = ({ onStart }) => (
  <section className="min-h-[50vh] flex items-center justify-center py-16 px-6 relative overflow-hidden">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10"
    >
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
        Neural Logic v2.0 Live
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter">
        Master Your Debt. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-100 to-cyan-500">
          Before It Masters You.
        </span>
      </h1>
      
      <div className="pt-4">
        <button 
          onClick={onStart} 
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl transition-all hover:scale-105 shadow-xl shadow-emerald-500/10 uppercase tracking-[0.2em] text-[10px]"
        >
          Begin Neural Analysis
        </button>
      </div>
    </motion.div>
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
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const runAnalysis = async () => {
    if (loading) return;
    
    // Move current results to baseline before fetching new data
    if (results.risk) {
      setSavedResults({...results});
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
    const diff = newVal - oldVal;
    if (diff === 0) return { text: "No Change", color: "text-zinc-500" };
    const isGood = diff < 0; 
    return {
      text: `${diff > 0 ? '+' : ''}${Math.round(diff).toLocaleString()}`,
      color: isGood ? "text-emerald-400" : "text-rose-400"
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

      <main className="max-w-[1600px] mx-auto px-6 pt-24 pb-32">
        
        <Hero onStart={() => scrollToSection('app-core')} />

        <div id="app-core" className="space-y-16 scroll-mt-32">
          
          {/* Input Form Wrapper */}
          <section className="max-w-4xl mx-auto bg-[#111827]/20 border border-zinc-800/40 rounded-[2.5rem] p-10 backdrop-blur-sm">
             <InputForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                calculateRisk={runAnalysis} 
                loading={loading} 
             />
          </section>

          <div id="results-anchor" className="min-h-[400px] w-full">
            {savedResults ? (
              <div className="space-y-10">
                
                {/* GLOBAL DELTA HEADER */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl flex justify-around items-center max-w-5xl mx-auto">
                   <div className="text-center">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">EMI Difference</p>
                      <p className={`text-xl font-black ${getDelta(results.risk?.monthly_emi, savedResults.risk?.monthly_emi).color}`}>
                        {getDelta(results.risk?.monthly_emi, savedResults.risk?.monthly_emi).text}
                      </p>
                   </div>
                   <div className="w-px h-10 bg-zinc-800" />
                   <div className="text-center">
                      <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Risk Variance</p>
                      <p className={`text-xl font-black ${getDelta(results.risk?.risk_score, savedResults.risk?.risk_score).color}`}>
                        {getDelta(results.risk?.risk_score, savedResults.risk?.risk_score).text}%
                      </p>
                   </div>
                   <button onClick={() => setSavedResults(null)} className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[9px] font-black rounded-xl uppercase tracking-widest transition-all">
                     Reset Comparison
                   </button>
                </div>

                {/* SIDE BY SIDE GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
                  
                  {/* LEFT: CURRENT SCENARIO */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Computation (Scenario B)</span>
                    </div>
                    <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[3rem] p-4">
                      <ResultsDashboard results={results} formData={formData} />
                    </div>
                  </div>

                  {/* RIGHT: PREVIOUS SCENARIO */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-4">
                      <div className="w-2 h-2 rounded-full bg-zinc-600" />
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Baseline Scenario (Scenario A)</span>
                    </div>
                    <div className="bg-zinc-900/10 border border-zinc-800/40 rounded-[3rem] p-4 opacity-70 grayscale-[0.4] hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                      <ResultsDashboard results={savedResults} formData={formData} />
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* Single View when no comparison is active */
              <div className="max-w-6xl mx-auto">
                <ResultsDashboard results={results} formData={formData} />
              </div>
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
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                   Neural Strategist
                </span>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-600">✕</button>
              </div>
              <Chatbot results={results} />
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl flex items-center justify-center shadow-lg transition-all"
        >
          {isChatOpen ? '✕' : '💬'}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-[#0b0f19]/90 backdrop-blur-md z-[300] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Computing Differences...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;