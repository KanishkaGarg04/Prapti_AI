import {
  LayoutDashboard,
  BarChart3,
  BrainCircuit,
  TrendingUp,
  FileText,
  History,
  Settings,
} from "lucide-react";

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
    name: "Reports",
    target: "reports",
  },
  {
    icon: History,
    name: "Analysis History",
    target: "history",
  },
];

export default function Sidebar() {
  const scrollToSection = (id) => {
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
    <aside
      className="sticky top-0 h-screen w-72 border-r border-slate-200 bg-white flex flex-col"
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo */}

      <div className="border-b border-slate-200 px-8 py-8">

        <h1 className="text-3xl font-bold text-blue-600 tracking-tight">
          Prapti AI
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Financial Intelligence
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-1">

          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() =>
                  scrollToSection(item.target)
                }
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-[14px]
                  font-medium
                  text-slate-700
                  hover:bg-blue-50
                  hover:text-blue-600
                  transition-all
                  duration-200
                "
              >
                <Icon size={19} />

                {item.name}
              </button>
            );
          })}

        </div>

      </nav>

      {/* Settings */}

      <div className="border-t border-slate-200 p-4">

        <button
          className="
            w-full
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-[14px]
            font-medium
            text-slate-700
            hover:bg-blue-50
            hover:text-blue-600
            transition-all
            duration-200
          "
        >
          <Settings size={19} />

          Settings

        </button>

        <div className="mt-6 border-t border-slate-100 pt-4">

          <p className="text-xs font-semibold text-slate-700">
            Prapti AI
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Version 1.0
          </p>

          <p className="mt-3 text-[11px] leading-5 text-slate-400">
            AI-powered financial planning, wealth
            optimization and intelligent investment
            recommendations.
          </p>

        </div>

      </div>

    </aside>
  );
}