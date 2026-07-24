import {
CheckCircle,
AlertTriangle,
Info
} from "lucide-react";

export default function RecommendationCards({items}){

return(

<div className="grid gap-5 w-full max-w-full">

{items.map((item,index)=>{

const Icon=

item.type==="success"

?CheckCircle

:item.type==="warning"

?AlertTriangle

:Info;

return(

<div
key={index}
className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm w-full overflow-hidden"
>

<div className="flex items-start sm:items-center gap-3">

<div className="shrink-0 mt-0.5 sm:mt-0">
<Icon className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6"/>
</div>

<div className="min-w-0 flex-1">

<h3 className="font-semibold text-sm sm:text-base text-slate-900 truncate">

{item.title}

</h3>

<p className="text-xs sm:text-sm text-gray-500 truncate">

Priority : {item.priority}

</p>

</div>

</div>

<p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 break-words">

{item.description}

</p>

</div>

);

})}

</div>

);

}