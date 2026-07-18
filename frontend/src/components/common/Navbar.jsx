import { Landmark } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center border border-gray-300 rounded-md">

            <Landmark
              size={18}
              className="text-gray-700"
            />

          </div>

          <div>

            <h1 className="text-[15px] font-semibold tracking-tight text-gray-900">
              Prapti AI
            </h1>

            <p className="text-[11px] text-gray-500">
              Financial Intelligence Platform
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="hidden gap-10 text-[14px] font-medium text-gray-600 md:flex">

          <a href="#" className="hover:text-gray-900 transition">
            Dashboard
          </a>

          <a href="#" className="hover:text-gray-900 transition">
            Analysis
          </a>

          <a href="#" className="hover:text-gray-900 transition">
            Reports
          </a>

          <a href="#" className="hover:text-gray-900 transition">
            Documentation
          </a>

        </nav>

        {/* Button */}

        <button className="rounded-md border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-100 transition">
          Sign In
        </button>

      </div>
    </header>
  );
}