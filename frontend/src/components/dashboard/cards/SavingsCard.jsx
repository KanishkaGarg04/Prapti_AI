import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function SavingsCard(){

const {analysis}=useAnalysis();

if(!analysis) return null;

return(

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

<p className="text-sm uppercase tracking-widest text-gray-400">

Monthly Surplus

</p>

<h2 className="mt-3 text-4xl font-bold text-blue-600">

₹

{analysis.savingsRate}

</h2>

<div className="mt-5 flex items-center gap-2">

<Wallet className="text-blue-600"/>

<span>

Savings Rate

{analysis.savingsRate}%

</span>

</div>

</motion.div>

);

}