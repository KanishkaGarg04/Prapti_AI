import { motion } from 'framer-motion';

export default function InputForm({ 
  formData, 
  handleInputChange, 
  calculateRisk, 
  scrollToSection, // Received from App.jsx
  loading 
}) {
  // Shared input style for consistency
  const inputClass = "w-full bg-[#0b0f19] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all";
  const labelClass = "block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        
        {/* Loan Amount */}
        <div className="md:col-span-2">
          <label className={labelClass}>Loan Amount (₹)</label>
          <input 
            type="number" 
            name="loan_amount" 
            placeholder="e.g. 50,00,000"
            value={formData.loan_amount} 
            onChange={handleInputChange}
            className={`${inputClass} text-base font-medium`} 
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label className={labelClass}>Interest Rate (% p.a.)</label>
          <input 
            type="number" 
            step="0.1" 
            name="interest_rate" 
            value={formData.interest_rate} 
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        {/* Tenure Slider + Display */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass.replace('mb-1.5', '')}>Tenure</label>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              {formData.tenure_years} Years
            </span>
          </div>
          <input 
            type="range" 
            min="1" max="30" 
            name="tenure_years" 
            value={formData.tenure_years} 
            onChange={handleInputChange}
            className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>

        {/* Monthly Income */}
        <div>
          <label className={labelClass}>Monthly Income (₹)</label>
          <input 
            type="number" 
            name="monthly_income" 
            value={formData.monthly_income} 
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        {/* Existing EMIs */}
        <div>
          <label className={labelClass}>Existing EMIs (₹)</label>
          <input 
            type="number" 
            name="existing_emis" 
            value={formData.existing_emis} 
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        {/* Job Type */}
        <div className="md:col-span-2">
          <label className={labelClass}>Employment Type</label>
          <div className="relative">
            <select 
              name="job_type" 
              value={formData.job_type} 
              onChange={handleInputChange}
              className={`${inputClass} appearance-none cursor-pointer pr-10`}
            >
              <option value="govt">Government Job</option>
              <option value="private">Private Job</option>
              <option value="freelance">Freelance</option>
              <option value="self_employed">Self Employed</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized Action Buttons Section */}
      <div className="pt-4 space-y-3">
        {/* Primary Action - Runs all API calls */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={calculateRisk}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing Financial Parameters..." : "Run Full Financial Analysis"}
        </motion.button>

        {/* Navigation Actions - Scrolls to specific results sections */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Optimize', id: 'optimize-section' },
            { label: 'Opportunity', id: 'opportunity-section' },
            { label: 'Rent vs Buy', id: 'rent-section' }
          ].map((tool) => (
            <button 
              key={tool.label}
              onClick={() => scrollToSection(tool.id)}
              className="py-2 bg-zinc-800/30 hover:bg-zinc-800 border border-zinc-700/50 rounded-md text-[9px] font-bold uppercase tracking-wider text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            >
              {tool.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}