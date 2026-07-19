import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="border-b border-gray-200 bg-white">

      <div className="flex items-center justify-between px-8 py-5">

        <div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Financial Dashboard
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Analyze loans and receive AI-powered financial insights.
          </p>

        </div>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">

            <Search size={17} />

            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm"
            />

          </div>

          <button className="border border-gray-300 p-2 hover:border-blue-400 transition">

            <Bell size={18} />

          </button>

        </div>

      </div>

    </header>
  );
}