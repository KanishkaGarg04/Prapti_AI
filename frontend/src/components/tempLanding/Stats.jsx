import { motion } from "framer-motion";

const stats = [
  {
    title: "Loans Analyzed",
    value: 1200,
    suffix: "+",
  },
  {
    title: "Interest Saved",
    value: 48,
    prefix: "₹",
    suffix: "L",
  },
  {
    title: "Average Risk Reduction",
    value: 34,
    suffix: "%",
  },
  {
    title: "AI Accuracy",
    value: 94,
    suffix: "%",
  },
];

export default function Stats() {
  return (
    <section className="border-b border-gray-200 bg-white">

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div
          className="
            grid
            grid-cols-1
            gap-5

            sm:grid-cols-2

            xl:grid-cols-4
          "
        >

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
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
                hover:shadow-xl

                sm:p-7

                lg:p-8
              "
            >

              {/* Accent Line */}

              <div className="mb-6 h-1 w-12 bg-blue-600"></div>

              {/* Title */}

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-gray-500
                "
              >
                {item.title}
              </p>

              {/* Value */}

              <h2
                className="
                  mt-5
                  break-words
                  text-3xl
                  font-semibold
                  leading-none
                  text-gray-900

                  sm:text-4xl

                  lg:text-5xl
                "
              >
                {item.prefix || ""}
                {item.value}
                {item.suffix || ""}
              </h2>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}