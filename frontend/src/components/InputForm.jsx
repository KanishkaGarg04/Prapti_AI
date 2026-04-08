import { motion } from 'framer-motion';

export default function InputForm({ 
  formData, 
  handleInputChange, 
  calculateRisk, 
  scrollToSection, 
  onSave, 
  loading 
}) {
  const inputClass = "w-full bg-[#0b0f19] border border-zinc-800 rounded-xl px-4 py-3 text-base text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-zinc-700";
  const labelClass = "block text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="md:col-span-2">
          <label className={labelClass}>Principal Loan Amount (₹)</label>
          <input 
            type="number" 
            name="loan_amount" 
            placeholder="e.g. 50,00,000"
            value={formData.loan_amount} 
            onChange={handleInputChange}
            className={`${inputClass} text-xl font-black text-emerald-400`} 
          />
        </div>

        <div>
          <label className={labelClass}>Interest Rate (% p.a.)</label>
          <input 
            type="number" 
            step="0.1" 
            name="interest_rate" 
            value={formData.interest_rate} 
            onChange={handleInputChange}
            className={`${inputClass} font-bold`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Tenure</label>
            <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {formData.tenure_years} Years
            </span>
          </div>
          <div className="pt-2 px-1">
            <input 
              type="range" 
              min="1" max="30" 
              name="tenure_years" 
              value={formData.tenure_years} 
              onChange={handleInputChange}
              className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Monthly Take-home (₹)</label>
          <input 
            type="number" 
            name="monthly_income" 
            value={formData.monthly_income} 
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Existing Monthly Obligations (₹)</label>
          <input 
            type="number" 
            name="existing_emis" 
            value={formData.existing_emis} 
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Employment Sector</label>
          <div className="relative">
            <select 
              name="job_type" 
              value={formData.job_type} 
              onChange={handleInputChange}
              className={`${inputClass} appearance-none cursor-pointer font-bold`}
            >
              <option value="govt">Government / Public Sector</option>
              <option value="private">Private Corporate</option>
              <option value="freelance">Freelance / Gig Economy</option>
              <option value="self_employed">Business Owner / Self-Employed</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
          </div>
        </div>
      </div>

      {/* Main Action Area - Dual Button Setup */}
      <div className="pt-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* PRIMARY: Run New Analysis */}
          <motion.button 
            whileHover={{ scale: 1.01, backgroundColor: '#10b981' }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateRisk}
            disabled={loading}
            className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(16,185,129,0.15)] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? "Processing..." : "Run Fresh Analysis"}
          </motion.button>

          {/* SECONDARY: Comparison Mode */}
          <motion.button 
            whileHover={{ scale: 1.01, borderColor: '#10b981' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (onSave) onSave(); // Saves current results to baseline
              calculateRisk();      // Runs new computation
            }}
            disabled={loading}
            className="flex-1 bg-transparent border-2 border-zinc-800 text-zinc-300 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:text-emerald-400 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            Compare with Stored Model
          </motion.button>

        </div>

        {/* Section Quick-Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-zinc-800/50 pt-8">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Jump To:</span>
          {[
            { label: 'Risk Metrics', id: 'risk-section' },
            { label: 'Growth/SIP', id: 'opportunity-section' },
            { label: 'Buy vs Rent', id: 'rent-section' }
          ].map((tool) => (
            <button 
              key={tool.label}
              type="button"
              onClick={() => scrollToSection(tool.id)}
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-all relative group"
            >
              {tool.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}