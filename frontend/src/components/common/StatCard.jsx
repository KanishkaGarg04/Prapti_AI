import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  positive = true,
}) {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        justify-between
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-300
        hover:shadow-xl

        sm:p-6
        lg:p-7
      "
    >
      {/* Top */}

      <div className="flex items-start justify-between gap-4">

        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.25em]
            text-gray-500

            sm:text-[11px]
          "
        >
          {title}
        </p>

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            border
            ${
              positive
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }
          `}
        >
          <ArrowUpRight
            size={18}
            className={
              positive
                ? "text-green-600"
                : "text-red-600"
            }
          />
        </div>

      </div>

      {/* Value */}

      <div className="mt-6">

        <h3
          className="
            break-words
            text-2xl
            font-semibold
            leading-tight
            text-gray-900

            sm:text-3xl
            lg:text-4xl
          "
        >
          {value}
        </h3>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-gray-500

            sm:text-base
          "
        >
          {subtitle}
        </p>

      </div>

    </div>
  );
}