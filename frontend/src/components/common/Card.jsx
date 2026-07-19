import { motion } from "framer-motion";

export default function Card({

    children,

    className=""

}){

    return(

        <motion.div

        initial={{
            opacity:0,
            y:15
        }}

        whileInView={{
            opacity:1,
            y:0
        }}

        viewport={{
            once:true
        }}

        transition={{
            duration:.45
        }}

        className={`
        bg-white
        border
        border-gray-200
        shadow-sm
        hover:shadow-lg
        hover:border-blue-300
        hover:-translate-y-1
        transition-all
        duration-300
        ${className}
        `}

        >

            {children}

        </motion.div>

    )

}