import { motion } from "framer-motion";
import CountUp from "react-countup";

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
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
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
              p-7
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-300
              hover:shadow-lg
              "
            >
              <div className="mb-5 h-1 w-12 bg-blue-600"></div>

              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-5 text-4xl font-semibold text-gray-900">
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