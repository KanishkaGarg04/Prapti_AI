import {
  TrendingUp,
  ShieldCheck,
  Wallet,
  PiggyBank,
} from "lucide-react";

export default function DashboardPreview({ analysis }) {

  const cards = [
    {
      title: "Monthly EMI",
      value: analysis
        ? `₹${analysis.emi.toLocaleString("en-IN")}`
        : "--",
      icon: Wallet,
    },
    {
      title: "Health Score",
      value: analysis
        ? `${analysis.healthScore}/100`
        : "--",
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

  return (

    <section className="border-t border-gray-200 bg-gray-50">

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >

        {/* Heading */}

        <div className="mb-10">

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-gray-500
            "
          >

            Dashboard Preview

          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              leading-tight
              text-gray-900

              sm:text-4xl

              lg:text-5xl
            "
          >

            Financial Summary

          </h2>

        </div>

        {/* Cards */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2

            xl:grid-cols-4
          "
        >

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <div

                key={card.title}

                className="
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:shadow-lg
                "

              >

                <div
                  className="
                    mb-7
                    flex
                    items-center
                    justify-between
                  "
                >

                  <p
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.25em]
                      text-gray-500
                    "
                  >

                    {card.title}

                  </p>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      border
                      border-gray-100
                      bg-blue-50
                    "
                  >

                    <Icon
                      size={18}
                      className="text-blue-600"
                    />

                  </div>

                </div>

                <h3
                  className="
                    break-words
                    text-2xl
                    font-semibold
                    text-gray-900

                    sm:text-3xl
                  "
                >

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