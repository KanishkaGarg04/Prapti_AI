import {
  LayoutDashboard,
  BarChart3,
  BrainCircuit,
  TrendingUp,
  FileText,
  History,
  Settings,
  Menu,
  X,
  HardDriveDownload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const menu = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    target: "top",
  },
  {
    icon: BarChart3,
    name: "Financial Analysis",
    target: "analysis",
  },
  {
    icon: BrainCircuit,
    name: "AI Financial Advisor",
    target: "advisor",
  },
 
  {
    icon: TrendingUp,
    name: "Investment Planner",
    target: "planner",
  },
  {
    icon: FileText,
    name: "Financial Charts",
    target: "charts",
  },
  {
    icon: History,
    name: "Recent Analysis",
    target: "history",
  },
   {
  icon: HardDriveDownload,
  name: "Offline Reports",
  route: "/offline",
},
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsOpen(false);

    if (id === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      
   <button
  onClick={() => setIsOpen(!isOpen)}
  className="
    lg:hidden
    fixed
    top-4
    left-4
    z-[60]
    rounded-xl
    bg-white
    p-3
    shadow-lg
    border
    border-slate-200
  "
>
  {isOpen ? <X size={22} /> : <Menu size={22} />}
</button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-white
          border-r
          border-slate-200
          flex
          flex-col
          z-50
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Prapti AI
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Financial Intelligence
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.route) {
                      setIsOpen(false);
                      navigate(item.route);
                    } else {
                      scrollToSection(item.target);
                    }
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3.5
                    text-[15px]
                    font-medium
                    text-slate-700
                    hover:bg-blue-50
                    hover:text-blue-600
                    transition
                  "
                >
                  <Icon size={20} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/settings");
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3.5
              text-[15px]
              font-medium
              text-slate-700
              hover:bg-blue-50
              hover:text-blue-600
              transition
            "
          >
            <Settings size={20} />
            Settings
          </button>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold text-slate-700">
              Prapti AI
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              Version 1.0
            </p>

            <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
              AI-powered financial planning,
              wealth optimization and intelligent
              investment recommendations.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}