import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';

const API_BASE = 'http://localhost:8000';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    loan_amount: 5000000,
    interest_rate: 8.5,
    tenure_years: 20,
    monthly_income: 80000,
    existing_emis: 15000,
    job_type: 'private',
    current_age: 30,
    monthly_rent: 25000,
  });

  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('risk');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'job_type' ? value : Number(value) || value
    }));
  };

  const calculateRisk = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/calculate-risk`, formData);
      setResults({ type: 'risk', data: res.data });
      setActiveTab('risk');
      setShowLanding(false);
    } catch (err) {
      alert("Backend is not running. Please start the Python backend.");
    }
    setLoading(false);
  };

  const optimizeLoan = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/optimize-loan`, formData);
      setResults({ type: 'optimize', data: res.data });
      setActiveTab('optimize');
      setShowLanding(false);
    } catch (err) {
      alert("Optimize API failed. Check if backend is running.");
    }
    setLoading(false);
  };

  const handleLogin = () => {
    setShowLogin(false);
    setIsLoggedIn(true);
    setShowLanding(false);
  };

  // Beautiful Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400 mt-6 text-lg">Analyzing your loan with AI...</p>
          <p className="text-zinc-500 text-sm mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Professional Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">P</div>
              <h1 className="text-3xl font-semibold tracking-tight">Prapti <span className="text-emerald-400">AI</span></h1>
            </div>

            <div className="hidden md:flex items-center gap-10 text-sm font-medium">
              <a href="#" className="hover:text-emerald-400 transition">Features</a>
              <a href="#" className="hover:text-emerald-400 transition">How it Works</a>
              <a href="#" className="hover:text-emerald-400 transition">Blog</a>
              <a href="#" className="hover:text-emerald-400 transition">About</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="px-6 py-2.5 text-sm font-medium hover:text-emerald-400 transition"
              >
                Log in
              </button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLogin(true)}
                className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2.5 rounded-2xl text-sm font-semibold transition"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-emerald-500/30 rounded-full px-6 py-2 mb-8">
              <span className="text-emerald-400">⚡</span>
              <span className="uppercase tracking-widest text-xs font-medium">AI-Powered Loan Intelligence</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-tight mb-6">
              Make Smarter<br />Loan Decisions
            </h1>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
              Analyze debt risk, optimize your EMI, compare rent vs buy, and see your financial future with AI.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowLanding(false)}
              className="bg-white text-black font-semibold text-lg px-10 py-5 rounded-3xl hover:bg-zinc-100 transition flex items-center gap-3 mx-auto"
            >
              Launch Analyzer
              <span className="text-2xl">→</span>
            </motion.button>

            <p className="text-zinc-500 mt-8 text-sm">No signup required • Instant results</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Main Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold">P</div>
            <h1 className="text-2xl font-semibold tracking-tight">Prapti <span className="text-emerald-400">AI</span></h1>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-emerald-400 transition">Features</a>
            <a href="#" className="hover:text-emerald-400 transition">How it Works</a>
            <a href="#" className="hover:text-emerald-400 transition">Pricing</a>
            {isLoggedIn && <button className="text-zinc-400 hover:text-white">Dashboard</button>}
            <button 
              onClick={() => setShowLanding(true)}
              className="text-emerald-400 hover:text-emerald-500 font-medium"
            >
              New Analysis
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12 grid lg:grid-cols-12 gap-10">
        {/* Input Form */}
        <div className="lg:col-span-5">
          <InputForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            calculateRisk={calculateRisk}
            optimizeLoan={optimizeLoan}
            loading={loading}
          />
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7">
          <ResultsDashboard 
            results={results} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;