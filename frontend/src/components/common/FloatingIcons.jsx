import { motion } from "framer-motion";
import {
  IndianRupee,
  Landmark,
  Wallet,
  TrendingUp,
} from "lucide-react";

const icons = [
  IndianRupee,
  Landmark,
  Wallet,
  TrendingUp,
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
        >
          <Icon
            size={45}
            className="text-blue-400"
          />
        </motion.div>
      ))}
    </>
  );
}