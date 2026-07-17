import { Menu, X, Landmark } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    "Features",
    "Dashboard",
    "AI Coach",
    "About",
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-lg px-6 py-4">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Landmark size={22} />
            </div>

            <div>
              <h1 className="font-bold text-xl text-slate-900">
                Prapti AI
              </h1>

              <p className="text-xs text-slate-500">
                Financial Intelligence
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-slate-700 hover:text-blue-600 transition font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex gap-3">

            <button className="px-5 py-2 rounded-xl font-medium border border-slate-300 hover:bg-slate-100 transition">
              Login
            </button>

            <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Get Started
            </button>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-3 rounded-2xl bg-white shadow-lg border border-slate-200 p-5"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-slate-700"
                >
                  {item}
                </a>
              ))}

              <button className="rounded-xl border py-2">
                Login
              </button>

              <button className="rounded-xl bg-blue-600 text-white py-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}