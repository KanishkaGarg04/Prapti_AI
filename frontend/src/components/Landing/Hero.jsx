import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (

    <section
      id="home"
      className="border-b border-gray-200 bg-gradient-to-b from-white to-slate-50"
    >

      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-12
          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:grid-cols-2
          lg:gap-20
          lg:px-8
          lg:py-24
        "
      >

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-blue-600
            "
          >
            Financial Intelligence Platform
          </p>

          <h1
            className="
              mt-5
              text-4xl
              font-semibold
              leading-tight
              text-gray-900

              sm:text-5xl

              lg:text-6xl
            "
          >

            Understand every

            <br />

            financial decision

            <span className="mt-3 block text-blue-600">

              before it becomes debt.

            </span>

          </h1>

          <p
            className="
              mt-8
              max-w-xl
              text-base
              leading-8
              text-gray-600

              lg:text-lg
            "
          >

            Prapti AI helps you analyze loan affordability,
            identify financial risks,
            optimize repayments,
            compare investment opportunities,
            and receive intelligent AI-powered
            financial recommendations.

          </p>

          {/* Buttons */}

          <div
            className="
              mt-10
              flex
              flex-col
              gap-4

              sm:flex-row
            "
          >

            <motion.button

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: .98,
              }}

              onClick={() => navigate("/dashboard")}

              className="
                w-full
                bg-blue-600
                px-7
                py-4
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700

                sm:w-auto
              "

            >

              Start Free Analysis

            </motion.button>

            <motion.button

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: .98,
              }}

              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }

              className="
                w-full
                border
                border-gray-300
                bg-white
                px-7
                py-4
                text-sm
                transition
                hover:border-blue-600
                hover:text-blue-600

                sm:w-auto
              "

            >

              Learn More

            </motion.button>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div

          initial={{
            opacity: 0,
            x: 40,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            delay: .4,
            duration: .7,
          }}

        >

          <div
            className="
              overflow-hidden
              border
              border-gray-200
              bg-white
              shadow-xl
            "
          >

            <div className="border-b border-gray-200 px-6 py-5">

              <p className="text-sm font-semibold">

                Live Financial Snapshot

              </p>

            </div>

            <div className="divide-y divide-gray-200">

              <Metric
                title="Monthly EMI"
                value="₹18,420"
                color="text-gray-900"
                delay={0}
              />

              <Metric
                title="Risk Score"
                value="41 / 100"
                color="text-blue-600"
                delay={0.1}
              />

              <Metric
                title="Debt Burden"
                value="32%"
                color="text-orange-500"
                delay={0.2}
              />

              <Metric
                title="Interest Saved"
                value="₹4.82 L"
                color="text-green-600"
                delay={0.3}
              />

              <Metric
                title="Investment Value"
                value="₹13.8 L"
                color="text-indigo-600"
                delay={0.4}
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}

function Metric({

  title,

  value,

  color,

  delay,

}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: 20,
      }}

      animate={{
        opacity: 1,
        x: 0,
      }}

      transition={{
        delay,
        duration: .45,
      }}

      whileHover={{
        backgroundColor: "#F8FAFC",
      }}

      className="
        flex
        items-center
        justify-between
        px-5
        py-5
      "

    >

      <p className="text-sm text-gray-500">

        {title}

      </p>

      <h3
        className={`
          text-base
          font-semibold

          sm:text-lg

          ${color}
        `}
      >

        {value}

      </h3>

    </motion.div>

  );

}