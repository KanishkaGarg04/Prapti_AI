import { motion } from 'framer-motion';

export default function InputForm({ 
  formData, 
  handleInputChange, 
  calculateRisk, 
  optimizeLoan,
  calculateOpportunity,
  calculateDebtVsRent,
  loading 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10"
    >
      <h2 className="text-3xl font-semibold mb-10 text-center">Loan Analysis Form</h2>

      <div className="space-y-8">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Loan Amount (₹)</label>
          <input 
            type="number" 
            name="loan_amount" 
            value={formData.loan_amount} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Interest Rate (% p.a.)</label>
            <input 
              type="number" 
              step="0.1" 
              name="interest_rate" 
              value={formData.interest_rate} 
              onChange={handleInputChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Tenure (Years)</label>
            <input 
              type="range" 
              min="5" max="30" 
              name="tenure_years" 
              value={formData.tenure_years} 
              onChange={handleInputChange}
              className="w-full accent-emerald-500 mt-3"
            />
            <p className="text-center mt-2 font-medium text-lg">{formData.tenure_years} years</p>
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Monthly Income (₹)</label>
          <input 
            type="number" 
            name="monthly_income" 
            value={formData.monthly_income} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Existing EMIs (₹)</label>
          <input 
            type="number" 
            name="existing_emis" 
            value={formData.existing_emis} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Job Type</label>
          <select 
            name="job_type" 
            value={formData.job_type} 
            onChange={handleInputChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500"
          >
            <option value="govt">Government Job</option>
            <option value="private">Private Job</option>
            <option value="freelance">Freelance</option>
            <option value="self_employed">Self Employed</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 grid grid-cols-2 gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateRisk}
            disabled={loading}
            className="bg-zinc-700 hover:bg-zinc-600 py-5 rounded-2xl font-semibold text-lg transition-all"
          >
            Check Risk Score
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={optimizeLoan}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-semibold text-lg transition-all"
          >
            Optimize Loan
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateOpportunity}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-5 rounded-2xl font-semibold text-lg transition-all"
          >
            Opportunity Cost
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateDebtVsRent}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 py-5 rounded-2xl font-semibold text-lg transition-all"
          >
            Debt vs Rent
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}