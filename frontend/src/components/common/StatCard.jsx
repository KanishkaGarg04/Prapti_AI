import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  positive = true,
}) {
  return (
    <div className="border border-gray-200 bg-white p-5 transition hover:border-gray-400">

      <div className="flex items-center justify-between">

        <p className="text-[11px] uppercase tracking-widest text-gray-500">
          {title}
        </p>

        <ArrowUpRight
          size={14}
          className={positive ? "text-green-600" : "text-red-600"}
        />

      </div>

      <h3 className="mt-4 text-2xl font-semibold text-gray-900">
        {value}
      </h3>

      <p className="mt-2 text-xs text-gray-500">
        {subtitle}
      </p>

    </div>
  );
}