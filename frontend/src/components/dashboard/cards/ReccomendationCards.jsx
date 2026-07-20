import {
CheckCircle,
AlertTriangle,
Info
} from "lucide-react";

export default function RecommendationCards({items}){

return(

<div className="grid gap-5">

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
className="rounded-xl border bg-white p-5 shadow-sm"
>

<div className="flex items-center gap-3">

<Icon className="text-blue-600"/>

<div>

<h3 className="font-semibold">

{item.title}

</h3>

<p className="text-sm text-gray-500">

Priority : {item.priority}

</p>

</div>

</div>

<p className="mt-4 text-gray-600">

{item.description}

</p>

</div>

);

})}

</div>

);

}