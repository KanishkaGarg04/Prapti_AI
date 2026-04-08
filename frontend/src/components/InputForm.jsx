import { motion } from 'framer-motion';

export default function InputForm({ 
  formData, 
  handleInputChange, 
  calculateRisk, 
  loading 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0b0f19] border border-zinc-800 rounded-3xl p-6 shadow-2xl max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-black text-white tracking-tighter mb-6 text-center">
        LOAN ANALYSIS
      </h2>

      <div className="space-y-5">
        {/* Loan Amount */}
        <div>
          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
            Principal Loan Amount
          </label>
          <input 
            type="number" 
            name="loan_amount" 
            value={formData.loan_amount} 
            onChange={handleInputChange}
            placeholder="50,00,000"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-lg font-semibold text-emerald-400 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Interest Rate & Tenure */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
              Interest Rate (% p.a.)
            </label>
            <input 
              type="number" 
              step="0.1" 
              name="interest_rate" 
              value={formData.interest_rate} 
              onChange={handleInputChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2 ml-1">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Tenure
              </label>
              <span className="text-emerald-400 font-bold text-sm">
                {formData.tenure_years} Years
              </span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="30" 
              name="tenure_years" 
              value={formData.tenure_years} 
              onChange={handleInputChange}
              className="w-full accent-emerald-500 bg-zinc-800 h-1.5 rounded-xl cursor-pointer"
            />
          </div>
        </div>

        {/* Monthly Income */}
        <div>
          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
            Monthly Take-home Income (₹)
          </label>
          <input 
            type="number" 
            name="monthly_income" 
            value={formData.monthly_income} 
            onChange={handleInputChange}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Existing EMIs */}
        <div>
          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
            Existing Monthly EMIs (₹)
          </label>
          <input 
            type="number" 
            name="existing_emis" 
            value={formData.existing_emis} 
            onChange={handleInputChange}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">
            Employment Sector
          </label>
          <select 
            name="job_type" 
            value={formData.job_type} 
            onChange={handleInputChange}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-base font-semibold focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
          >
            <option value="govt">Government / Public Sector</option>
            <option value="private">Private Corporate</option>
            <option value="freelance">Freelance / Gig Economy</option>
            <option value="self_employed">Business Owner / Self-Employed</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateRisk}
            disabled={loading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-70"
          >
            {loading ? "ANALYZING..." : "RUN ANALYSIS"}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateRisk}
            disabled={loading}
            className="flex-1 border border-zinc-700 hover:border-zinc-400 py-3 rounded-xl font-bold text-xs uppercase tracking-wide text-zinc-300 transition-all disabled:opacity-70"
          >
            COMPARE
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}