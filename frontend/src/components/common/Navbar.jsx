import { Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Navbar(){
const navigate = useNavigate();
    return(

<header className="

sticky

top-0

z-50

bg-white/90

backdrop-blur-md

border-b

border-gray-200

">

<div className="

mx-auto

max-w-7xl

h-16

px-6

flex

items-center

justify-between

">

<div className="flex items-center gap-3">

<Landmark

size={20}

className="text-blue-600"

/>

<div>

<h1 className="text-sm font-semibold">

Prapti AI

</h1>

<p className="text-[11px] text-gray-500">

Financial Intelligence Platform

</p>

</div>

</div>

<nav className="flex items-center gap-8">

<a

href="#"

className="text-sm text-gray-600 hover:text-blue-600"

>

Home

</a>

<a

href="#"

className="text-sm text-gray-600 hover:text-blue-600"

>

<button
onClick={()=>navigate("/dashboard")}
>

Dashboard

</button>

</a>

<a

href="#"

className="text-sm text-gray-600 hover:text-blue-600"

>

Documentation

</a>

<button

className="

border

border-gray-300

px-4

py-2

text-sm

hover:border-blue-600

hover:text-blue-600

"

>

Launch

</button>

</nav>

</div>

</header>

)

}