import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white">
      <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
        {/* Left */}
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Financial Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Analyze loans, monitor financial health and receive AI-powered
            insights.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-3">
          <button
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              transition-all
              hover:border-blue-500
              hover:shadow-sm
            "
          >
            <Bell
              size={20}
              className="text-slate-600"
            />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}