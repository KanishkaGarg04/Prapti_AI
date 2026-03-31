import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend 
} from 'recharts';

// Beautiful Custom Tooltip with ₹ Indian Format
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md min-w-[180px]">
        <p className="text-zinc-400 text-sm mb-3 font-medium">Year {label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span style={{ color: entry.color }} className="font-medium">
              {entry.name}
            </span>
            <span className="font-semibold text-white">
              ₹{entry.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Rupee Formatter for Axis
const rupeeFormatter = (value) => `₹${value.toLocaleString('en-IN')}`;

export default function ResultsDashboard({ results, activeTab, setActiveTab, formData }) {
  if (!results) {
    return (
      <div className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center">
        <div className="text-7xl mb-6 opacity-50">📈</div>
        <h3 className="text-2xl font-semibold text-zinc-400 mb-3">Your Results Dashboard</h3>
        <p className="text-zinc-500 max-w-xs">Form fill karke Calculate button dabao to see beautiful charts & insights</p>
      </div>
    );
  }

  const { data } = results;

  // Risk Score Card
  const renderRiskScore = (riskData) => {
    if (!riskData) return null;
    const { risk_score, category, color, explanation, burden_ratio_percent } = riskData;
    
    const colorMap = { green: 'emerald', yellow: 'amber', red: 'rose' };
    const badgeColor = colorMap[color] || 'emerald';

    return (
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 mb-8"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold">Debt Trap Risk Score</h3>
          <span className="text-4xl">{category.split(' ')[0]}</span>
        </div>

        <div className={`text-8xl font-bold text-${badgeColor}-400 tracking-tighter`}>
          {risk_score}
          <span className="text-4xl font-normal text-zinc-500">/100</span>
        </div>

        <div className={`inline-flex px-6 py-2 rounded-full bg-${badgeColor}-500/10 text-${badgeColor}-400 font-semibold mb-6 mt-2`}>
          {category}
        </div>

        <p className="text-zinc-300 leading-relaxed text-[15px]">{explanation}</p>

        <div className="mt-8 pt-6 border-t border-zinc-700 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-400">Monthly EMI</span><br />
            <span className="text-white font-semibold text-lg">₹{data.emi_monthly?.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-zinc-400">Income Burden</span><br />
            <span className="text-white font-semibold text-lg">{burden_ratio_percent}%</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-zinc-900 border border-zinc-700 rounded-2xl p-1.5">
        {['risk', 'opportunity', 'debtvsrent'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 px-6 rounded-xl font-medium transition-all text-sm md:text-base ${
              activeTab === tab 
                ? 'bg-white text-black shadow-md' 
                : 'hover:bg-zinc-800 text-zinc-400'
            }`}
          >
            {tab === 'risk' && 'Risk Score'}
            {tab === 'opportunity' && 'Opportunity Cost'}
            {tab === 'debtvsrent' && 'Debt vs Rent'}
          </button>
        ))}
      </div>

      {/* Risk Tab */}
      {activeTab === 'risk' && data.risk && renderRiskScore(data.risk)}

      {/* Opportunity Cost - Highly Customized Chart */}
      {activeTab === 'opportunity' && data.chart_data && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-1">Opportunity Cost Simulator</h3>
          <p className="text-emerald-400 mb-8">What if you invested EMI money instead?</p>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart_data} margin={{ top: 20, right: 40, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis 
                  dataKey="year" 
                  stroke="#52525b" 
                  tick={{ fill: '#a1a1aa', fontSize: 13 }}
                />
                <YAxis 
                  stroke="#52525b" 
                  tickFormatter={rupeeFormatter}
                  tick={{ fill: '#a1a1aa', fontSize: 13 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Line 
                  type="natural" 
                  dataKey="cumulative_emi_paid" 
                  stroke="#f43f5e" 
                  strokeWidth={4} 
                  dot={{ r: 5, fill: '#f43f5e' }}
                  activeDot={{ r: 8 }}
                  name="Total EMI Paid"
                />
                <Line 
                  type="natural" 
                  dataKey="mutual_fund_growth" 
                  stroke="#10b981" 
                  strokeWidth={5} 
                  dot={{ r: 5, fill: '#10b981' }}
                  activeDot={{ r: 8 }}
                  name="Mutual Fund @ 12%"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl">
            <p className="text-emerald-400 leading-relaxed">{data.explanation}</p>
          </div>
        </div>
      )}

      {/* Debt vs Rent - Customized Bar Chart */}
      {activeTab === 'debtvsrent' && data.debt_vs_rent_data && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-8">Debt vs Rent Analyzer (20 Years)</h3>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.debt_vs_rent_data} margin={{ top: 20, right: 40, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="year" stroke="#52525b" tick={{ fill: '#a1a1aa' }} />
                <YAxis stroke="#52525b" tickFormatter={rupeeFormatter} tick={{ fill: '#a1a1aa' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Bar 
                  dataKey="debt_cumulative" 
                  fill="#e11d48" 
                  name="Cumulative Loan Cost" 
                  radius={[6, 6, 0, 0]}
                />
                <Bar 
                  dataKey="rent_cumulative" 
                  fill="#3b82f6" 
                  name="Cumulative Rent Cost" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <div className="bg-zinc-800/80 border border-rose-900/30 rounded-2xl p-6">
              <p className="text-rose-400 text-sm">20 Years Total Debt</p>
              <p className="text-4xl font-bold mt-3 text-rose-400">₹{data['20_year_debt_total']?.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-zinc-800/80 border border-blue-900/30 rounded-2xl p-6">
              <p className="text-blue-400 text-sm">20 Years Total Rent</p>
              <p className="text-4xl font-bold mt-3 text-blue-400">₹{data['20_year_rent_total']?.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}