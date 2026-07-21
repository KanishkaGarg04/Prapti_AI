import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-8 py-5">

        <div>
          <h2 className="text-[30px] font-semibold tracking-tight text-slate-900">
            Financial Dashboard
          </h2>

          <p className="mt-1 text-[15px] text-slate-500">
            Analyze loans, monitor financial health and receive AI-powered insights.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-500 hover:shadow-sm">
            <Bell
              size={20}
              className="text-slate-600"
            />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600"></span>
          </button>

        </div>

      </div>
    </header>
  );
}