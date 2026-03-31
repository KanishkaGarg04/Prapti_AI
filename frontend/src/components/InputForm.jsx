import { motion } from 'framer-motion';

export default function InputForm({ 
  formData, 
  handleInputChange, 
  calculateRisk, 
  optimizeLoan, 
  loading 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-8 shadow-2xl sticky top-8"
    >
      <h2 className="text-2xl font-semibold mb-8">Enter Loan Details</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Loan Amount (₹)</label>
          <input 
            type="number" 
            name="loan_amount" 
            value={formData.loan_amount} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3.5 focus:outline-none focus:border-emerald-500 text-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Interest Rate (% p.a.)</label>
            <input 
              type="number" 
              step="0.1" 
              name="interest_rate" 
              value={formData.interest_rate} 
              onChange={handleInputChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3.5 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tenure (Years)</label>
            <input 
              type="range" 
              min="5" 
              max="30" 
              step="1"
              name="tenure_years" 
              value={formData.tenure_years} 
              onChange={handleInputChange} 
              className="w-full accent-emerald-500 mt-2" 
            />
            <p className="text-center text-sm mt-1 font-medium">{formData.tenure_years} years</p>
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Monthly Income (₹)</label>
          <input 
            type="number" 
            name="monthly_income" 
            value={formData.monthly_income} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3.5 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Existing EMIs (₹ per month)</label>
          <input 
            type="number" 
            name="existing_emis" 
            value={formData.existing_emis} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3.5 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Job Type</label>
          <select 
            name="job_type" 
            value={formData.job_type} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="govt">Government Job</option>
            <option value="private">Private Job</option>
            <option value="freelance">Freelance</option>
            <option value="self_employed">Self Employed</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateRisk}
            disabled={loading}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-4 rounded-2xl font-semibold transition-all disabled:opacity-70"
          >
            {loading ? "Calculating..." : "Check Risk"}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={optimizeLoan}
            disabled={loading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-semibold transition-all disabled:opacity-70"
          >
            {loading ? "Optimizing..." : "Optimize Loan"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}