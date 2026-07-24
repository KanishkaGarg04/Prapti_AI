import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
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
        className="absolute -top-32 -left-32 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-blue-500/15 sm:bg-blue-500/20 blur-[120px] sm:blur-[180px]"
      />

      <motion.div
        animate={{
          x: [100, -100, 150],
          y: [0, 120, -80],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-0 bottom-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-cyan-500/15 sm:bg-cyan-500/20 blur-[120px] sm:blur-[180px]"
      />
    </div>
  );
}