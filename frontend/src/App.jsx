import { useState } from 'react';
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
    current_age: 30,
    monthly_rent: 25000,
  });

  const [results, setResults] = useState({
    risk: null,
    optimize: null,
    opportunity: null,
    debtvsrent: null,
  });

  const [loading, setLoading] = useState(false);

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
      setResults(prev => ({ ...prev, risk: res.data }));
    } catch (err) {
      alert("Backend not running. Please start Python backend.");
    }
    setLoading(false);
  };

  const optimizeLoan = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/optimize-loan`, formData);
      setResults(prev => ({ ...prev, optimize: res.data }));
    } catch (err) {
      alert("Optimize API failed.");
    }
    setLoading(false);
  };

  const calculateOpportunity = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/opportunity-cost`, formData);
      setResults(prev => ({ ...prev, opportunity: res.data }));
    } catch (err) {
      alert("Opportunity Cost API failed.");
    }
    setLoading(false);
  };

  const calculateDebtVsRent = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/debt-vs-rent`, formData);
      setResults(prev => ({ ...prev, debtvsrent: res.data }));
    } catch (err) {
      alert("Debt vs Rent API failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">P</div>
            <h1 className="text-2xl font-semibold tracking-tight">Prapti <span className="text-emerald-400">AI</span></h1>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="text-emerald-400 hover:text-white font-medium"
          >
            New Analysis
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Form Section - Top */}
        <div className="mb-16">
          <InputForm 
            formData={formData}
            handleInputChange={handleInputChange}
            calculateRisk={calculateRisk}
            optimizeLoan={optimizeLoan}
            calculateOpportunity={calculateOpportunity}
            calculateDebtVsRent={calculateDebtVsRent}
            loading={loading}
          />
        </div>

        {/* Results Section - Below Form */}
        <ResultsDashboard results={results} />
      </div>

      {/* Chatbot Fixed on Right */}
      <Chatbot results={results} />
    </div>
  );
}

export default App;