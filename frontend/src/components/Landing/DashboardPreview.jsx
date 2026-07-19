import {
  TrendingUp,
  ShieldCheck,
  Wallet,
  PiggyBank,
} from "lucide-react";

const cards = [
  {
    title: "Monthly EMI",
    value: analysis
    ? `₹${analysis.emi.toLocaleString("en-IN")}`
    : "--",
    icon: Wallet,
  },
  {
    title: "Risk Score",
    value: analysis ? `${analysis.riskScore}/100` : "--",
    icon: ShieldCheck,
  },
  {
    title: "Investment Value",
    value: "₹32.4L",
    icon: TrendingUp,
  },
  {
    title: "Interest Saved",
    value: "₹4.8L",
    icon: PiggyBank,
  },
];

export default function DashboardPreview() {
  return (
    <section className="border-t border-gray-200 bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Dashboard Preview
          </p>

          <h2 className="mt-4 text-5xl font-bold tracking-tight font-semibold text-gray-900">
            Financial Summary
          </h2>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-8 flex items-center justify-between">

                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    {card.title}
                  </p>

                  <Icon size={18} className="text-gray-700" />

                </div>

                <h3 className="text-3xl font-semibold text-gray-900">
                  {card.value}
                </h3>

              </div>

            );
          })}
        </div>

      </div>

    </section>
  );
}