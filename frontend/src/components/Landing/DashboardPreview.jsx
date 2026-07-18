import { motion } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  PiggyBank,
  ShieldCheck,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.3em] text-blue-400 font-semibold">
            Live Analytics
          </p>

          <h2 className="mt-5 text-5xl font-black text-white">
            AI Financial Dashboard
          </h2>

          <p className="mt-6 text-slate-300 text-lg max-w-3xl mx-auto">
            Every important financial metric, recommendation, and risk
            indicator—beautifully visualized in one intelligent dashboard.
          </p>
        </motion.div>

        {/* Dashboard */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
        >

          {/* TOP ROW */}

          <div className="grid lg:grid-cols-4 gap-6">

            <MetricCard
              icon={<Wallet />}
              title="Monthly EMI"
              value="₹18,420"
              color="blue"
            />

            <MetricCard
              icon={<ShieldCheck />}
              title="Risk Score"
              value="82"
              color="green"
            />

            <MetricCard
              icon={<PiggyBank />}
              title="Savings"
              value="₹26K"
              color="emerald"
            />

            <MetricCard
              icon={<TrendingUp />}
              title="Interest Saved"
              value="₹5.8L"
              color="orange"
            />

          </div>

          {/* Middle */}

          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            {/* Chart */}

            <div className="lg:col-span-2 rounded-3xl bg-slate-800 p-8">

              <div className="flex justify-between">

                <div>

                  <h3 className="text-white text-xl font-bold">
                    Wealth Growth
                  </h3>

                  <p className="text-slate-400">
                    Next 12 Months
                  </p>

                </div>

                <ArrowUpRight className="text-green-400" />
              </div>

              {/* Fake Animated Chart */}

              <div className="mt-10 flex items-end gap-4 h-60">

                {[25,45,40,65,55,72,85,80,92,100].map((height,index)=>(
                  <motion.div
                    key={index}
                    initial={{height:0}}
                    whileInView={{height:`${height}%`}}
                    transition={{
                      delay:index*.08
                    }}
                    className="flex-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400"
                  />
                ))}

              </div>

            </div>

            {/* AI */}

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8">

              <div className="flex items-center gap-3">

                <BrainCircuit
                  className="text-white"
                  size={30}
                />

                <h3 className="text-white text-xl font-bold">
                  AI Coach
                </h3>

              </div>

              <div className="mt-8">

                <div className="rounded-2xl bg-white/10 p-5">

                  <p className="text-white font-semibold">
                    Recommendation
                  </p>

                  <p className="mt-3 text-blue-100 leading-7">

                    Increase your SIP by ₹5,000/month.

                    You can save approximately ₹18.4 Lakhs over
                    the next decade while maintaining a safe debt ratio.

                  </p>

                </div>

                <button className="mt-8 w-full rounded-xl bg-white py-4 font-semibold text-blue-700 hover:scale-[1.02] transition">

                  Talk to AI

                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function MetricCard({icon,title,value}){

return(

<div className="rounded-2xl bg-slate-800 p-6 border border-slate-700">

<div className="flex justify-between">

<div className="text-blue-400">

{icon}

</div>

<p className="text-slate-400">

{title}

</p>

</div>

<h2 className="mt-8 text-4xl font-black text-white">

{value}

</h2>

</div>

)

}