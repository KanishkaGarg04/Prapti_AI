import { useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence for smooth popup
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import Chatbot from './components/ChatBot';

const API_BASE = 'http://localhost:8000';

// --- LANDING SUB-COMPONENTS (Hero & Bento) ---
const Hero = ({ onStart }) => (
  <section className="py-24 px-6 text-center relative overflow-hidden">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto space-y-8">
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em]">
        Neural Logic v1.0 Live
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
        Master Your Debt. <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Before It Masters You.</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
        Stop using basic calculators. Use a high-fidelity resilience engine to simulate market shocks and optimize interest.
      </p>
      <div className="pt-6">
        <button onClick={onStart} className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-full transition-all hover:scale-105 shadow-2xl shadow-emerald-500/30 uppercase tracking-widest text-xs">
          Begin Neural Analysis
        </button>
      </div>
    </motion.div>
  </section>
);

const BentoFeatures = () => {
  const feats = [
    { title: "Stress Simulation", desc: "Simulate 30% income drops or 2.5% rate hikes instantly.", icon: "📉" },
    { title: "ROI Optimization", desc: "Our algorithm finds the mathematical sweet spot.", icon: "🎯" },
    { title: "Opportunity Cost", desc: "See the fortune you lose vs. investing in 12% SIPs.", icon: "💰" }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 pb-24">
      {feats.map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-emerald-500/40 transition-all group">
          <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-300">{f.icon}</div>
          <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed font-medium">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

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
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // NEW: Toggle state for Chat

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'job_type' ? value : (value === '' ? '' : Number(value)) }));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const runAnalysis = async () => {
    if (loading) return;
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
        risk: getPayload(responses[0]), optimize: getPayload(responses[1]), 
        opportunity: getPayload(responses[2]), debtvsrent: getPayload(responses[3]), 
        shocks: getPayload(responses[4]) 
      });
      setTimeout(() => scrollToSection('results-anchor'), 150);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[15px] text-zinc-400 flex flex-col selection:bg-emerald-500/30 font-sans relative">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full h-16 border-b border-zinc-800/40 flex items-center px-8 justify-between bg-[#0b0f19]/80 backdrop-blur-xl z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-emerald-500 rounded flex items-center justify-center text-black font-black text-xs">P</div>
          <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">Prapti AI</span>
        </div>
        <button onClick={() => scrollToSection('app-core')} className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold rounded-full transition-all uppercase tracking-widest">
          Analyze Now
        </button>
      </nav>

      <div className="flex-1 flex pt-16">
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <Hero onStart={() => scrollToSection('app-core')} />
          <BentoFeatures />

          <div id="app-core" className="max-w-4xl mx-auto p-10 md:p-14 space-y-12 relative scroll-mt-20">
            <header className="space-y-3 relative">
              <h2 className="text-3xl font-bold text-white tracking-tight">Financial Resilience <span className="text-emerald-500 font-black">Engine</span></h2>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-[0.2em]">Deep-Dive Debt Analysis & Stress Testing</p>
            </header>

            <section className="bg-[#111827] border border-zinc-800/60 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
               <InputForm formData={formData} handleInputChange={handleInputChange} calculateRisk={runAnalysis} loading={loading} />
            </section>

            <div id="results-anchor" className="scroll-mt-20 min-h-[600px]">
              <ResultsDashboard results={results} formData={formData} />
            </div>
          </div>
          <footer className="py-20 text-center opacity-30"><p className="text-xs uppercase tracking-[0.5em]">Mathematical Integrity Secured • 2026</p></footer>
        </main>
      </div>

      {/* --- NEW: FLOATING CHATBOT ICON --- */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-96 h-[550px] bg-[#0b0f19] border border-zinc-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-200">Neural Strategist</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Chatbot results={results} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/20 transition-transform active:scale-95"
        >
          {isChatOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[#0b0f19]/90 backdrop-blur-md z-[110] flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <div className="w-16 h-16 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm font-black text-emerald-500 uppercase tracking-[0.4em] animate-pulse">Running Neural Scenarios</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;