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
    <div className={`${bg} rounded-xl p-4 flex items-center gap-3`}>
      <Icon className={color} />
      <div>
        <p className="text-sm text-gray-500">
          Financial Status
        </p>

        <h3 className={`font-bold ${color}`}>
          {text}
        </h3>
      </div>
    </div>
  );
}