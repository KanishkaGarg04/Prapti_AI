import { motion } from 'framer-motion';

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        px-6
        py-3
        bg-emerald-500
        hover:bg-emerald-600
        text-black
        text-xs
        sm:text-sm
        font-black
        uppercase
        tracking-wider
        border
        border-emerald-400
        rounded-xl
        shadow-lg
        shadow-emerald-500/25
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        gap-2
      "
    >
      {children}
    </motion.button>
  );
}