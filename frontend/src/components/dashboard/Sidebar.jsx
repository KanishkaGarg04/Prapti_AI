import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    icon: Wallet,
    name: "Loan Analysis",
    path: "/dashboard",
  },
  {
    icon: BarChart3,
    name: "Reports",
    path: "/reports",
  },
  {
    icon: FileText,
    name: "History",
    path: "/history",
  },
  {
    icon: Settings,
    name: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-gray-200 bg-white shadow-sm">
      {/* Logo */}

      <div className="border-b border-gray-200 px-8 py-8">
        <h1 className="text-2xl font-bold text-blue-600">
          Prapti AI
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Financial Intelligence
        </p>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
              group
              flex
              w-full
              items-center
              gap-4
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-2"
              }
              `
              }
            >
              <Icon
                size={19}
                className="transition-transform duration-300 group-hover:rotate-6"
              />

              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}

      <div className="border-t border-gray-200 px-6 py-5">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-gray-900">
            Prapti AI v1.0
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            AI-powered financial planning, loan optimization, and intelligent
            recommendations.
          </p>
        </div>
      </div>
    </aside>
  );
}