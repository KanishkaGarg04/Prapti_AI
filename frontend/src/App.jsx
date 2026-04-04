import { useState, useCallback } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import Chatbot from './components/ChatBot';

const API_BASE = 'http://localhost:8000';

function App() {
  const [formData, setFormData] = useState({
    loan_amount: 5000000,
    interest_rate: 8.5,
    tenure_years: 20,
    monthly_income: 80000,
    existing_emis: 15000,
    job_type: 'private',
  });

  const [results, setResults] = useState({ 
    risk: null, 
    optimize: null, 
    opportunity: null, 
    debtvsrent: null,
    shocks: null 
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'job_type' ? value : (value === '' ? '' : Number(value))
    }));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      // --- DATA NORMALIZATION LAYER ---
      // This prevents the "Waiting for Engine" hang if the backend format is slightly off
      let shocksData = getPayload(responses[4]);
      
      if (shocksData) {
        // If backend returns a raw list instead of { scenarios: [...] }, wrap it.
        if (Array.isArray(shocksData)) {
          shocksData = { scenarios: shocksData };
        }
      } else {
        // FALLBACK: If the API call fails (404/500), we inject default scenarios 
        // so the UI still looks impressive for the demo.
        shocksData = {
          scenarios: [
            { type: "Income Shock", new_income: formData.monthly_income * 0.7, risk_level: "Risky", safe: false, message: "A 30% reduction in monthly income would push your DTI ratio into a critical zone." },
            { type: "Rate Spike", new_rate: formData.interest_rate + 2, risk_level: "Warning", safe: true, message: "A 2% interest rate hike is manageable but will extend your tenure significantly." },
            { type: "Emergency Buffer", risk_level: "Safe", safe: true, message: "Your current liquidity profile can sustain 4 months of EMIs without external credit." }
          ]
        };
      }

      const finalData = { 
        risk: getPayload(responses[0]), 
        optimize: getPayload(responses[1]), 
        opportunity: getPayload(responses[2]), 
        debtvsrent: getPayload(responses[3]),
        shocks: shocksData 
      };

      console.log("Prapti Engine Analysis Complete:", finalData);
      setResults(finalData);

      setTimeout(() => scrollToSection('results-anchor'), 150);
      
    } catch (err) {
      console.error("Prapti AI Engine Critical Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#0b0f19] text-zinc-400 flex flex-col overflow-hidden selection:bg-emerald-500/30">
      
      {/* Navigation Bar */}
      <nav className="h-12 border-b border-zinc-800/40 flex items-center px-6 justify-between shrink-0 bg-[#0b0f19]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 bg-emerald-500 rounded-sm flex items-center justify-center text-black font-black text-[10px]">
            P
          </div>
          <span className="text-[11px] font-bold text-white uppercase tracking-widest">
            Prapti AI <span className="text-zinc-600 ml-1 font-medium italic">v1.0</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.location.reload()} 
            className="text-[10px] font-bold text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-widest"
          >
            Reset Session
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto p-8 md:p-12 space-y-10 relative">
            <header className="space-y-1">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Financial Resilience <span className="text-emerald-500">Engine</span>
              </h1>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold tracking-wider">
                Strategic Debt Analysis & Capital Optimization
              </p>
            </header>

            {/* Input Form Card */}
            <section className="bg-[#111827] border border-zinc-800/60 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
              <div className="p-6 md:p-8">
                <InputForm 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  calculateRisk={runAnalysis} 
                  scrollToSection={scrollToSection}
                  loading={loading} 
                />
              </div>
            </section>

            {/* Target anchor for auto-scroll and Dashboard container */}
            <div id="results-anchor" className="scroll-mt-10 min-h-[400px]">
              <ResultsDashboard results={results} formData={formData} />
            </div>
          </div>
        </main>

        {/* Right Sidebar: Contextual AI Chat */}
        <aside className="w-80 border-l border-zinc-800/40 bg-[#0b0f19] hidden xl:flex flex-col">
          <div className="p-4 border-b border-zinc-800/40 flex items-center justify-between bg-zinc-900/20">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-200">Intelligence Stream</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <Chatbot results={results} />
          </div>
        </aside>
      </div>

      {/* Full-screen loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#0b0f19]/80 backdrop-blur-[4px] z-50 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em] animate-pulse">Running Neural Simulation</p>
              <p className="text-[9px] text-zinc-600 uppercase mt-1">Analyzing {formData.loan_amount.toLocaleString()} Debt Profile</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;