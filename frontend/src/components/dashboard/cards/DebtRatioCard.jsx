import { TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function DebtRatioCard() {

  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const color =
    analysis.debtRatio > 50
      ? "text-red-600"
      : analysis.debtRatio > 35
      ? "text-yellow-600"
      : "text-green-600";

  return (

    <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
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

          <p className="text-sm uppercase tracking-widest text-gray-400 ">

            Debt Ratio

          </p>

          <h2 className={`mt-2 text-4xl font-bold ${color}`}>

            {analysis.debtRatio}

            %

          </h2>

        </div>

        <TrendingDown
          size={40}
          className={color}
        />

      </div>

    </motion.div>

  );

}