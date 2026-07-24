import { motion } from 'framer-motion';

export default function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
    full = true,
    variant = "primary" // Added variant for flexibility matching your dashboard aesthetic
}) {
    const baseStyles = "px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2";
    
    const variants = {
        primary: "bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg shadow-emerald-500/25 border border-emerald-400",
        secondary: "bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300",
        danger: "bg-rose-500 hover:bg-rose-600 text-black shadow-lg shadow-rose-500/25 border border-rose-400"
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                ${full ? "w-full" : "w-auto"}
                ${baseStyles}
                ${variants[variant] || variants.primary}
                disabled:opacity-50 disabled:cursor-not-allowed
            `}
        >
            {children}
        </motion.button>
    );
}