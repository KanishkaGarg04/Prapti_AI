
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { useAnalysis } from "../../../context/AnalysisContext";


export default function HealthScoreCard() {

  const { analysis } = useAnalysis();

  if (!analysis) return null;

  return (

    <motion.div

      initial={{ opacity:0,y:20 }}

      animate={{ opacity:1,y:0 }}

      className="bg-white
rounded-2xl
border
border-slate-200
p-6
shadow-sm
hover:shadow-xl
transition-all
duration-300
min-h-[180px]
flex
flex-col
justify-between"

    >

      <div className="flex justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-400">

            Financial Health

          </p>

          <h1 className="mt-2 text-4xl font-bold text-green-600">

           {analysis.healthScore}

            /100

          </h1>

        </div>

        <HeartPulse

          className="text-green-600"

          size={40}

        />

      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">

        <motion.div

          initial={{ width:0 }}

          animate={{
            width:`${analysis.healthScore}%`
          }}

          transition={{
            duration:1.2
          }}

          className="h-full bg-green-600"

        />

      </div>

    </motion.div>

  );

}