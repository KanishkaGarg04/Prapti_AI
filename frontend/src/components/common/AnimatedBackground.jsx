import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[180px]"
      />

      <motion.div
        animate={{
          x: [300, -100, 250],
          y: [0, 150, -100],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[180px]"
      />
    </div>
  );
}