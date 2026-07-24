import { ShieldCheck, AlertTriangle, CircleDollarSign } from "lucide-react";

export default function FinancialStatus({ score }) {
  let color = "text-red-600";
  let bg = "bg-red-100";
  let text = "Poor";
  let Icon = AlertTriangle;

  if (score >= 80) {
    color = "text-green-600";
    bg = "bg-green-100";
    text = "Excellent";
    Icon = ShieldCheck;
  } else if (score >= 60) {
    color = "text-yellow-600";
    bg = "bg-yellow-100";
    text = "Good";
    Icon = CircleDollarSign;
  }

  return (
    <div className={`${bg} rounded-xl p-3 sm:p-4 flex items-center gap-3 w-full max-w-full overflow-hidden`}>
      <div className="shrink-0">
        <Icon className={`${color} w-6 h-6 sm:w-7 sm:h-7`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm text-gray-500 truncate">
          Financial Status
        </p>

        <h3 className={`text-base sm:text-lg font-bold ${color} truncate`}>
          {text}
        </h3>
      </div>
    </div>
  );
}