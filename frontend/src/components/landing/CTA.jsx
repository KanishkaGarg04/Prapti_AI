import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {

  const navigate = useNavigate();

  return (

    <section className="border-t border-slate-800 bg-slate-900">

      <div
        className="
          mx-auto
          max-w-6xl
          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-24
        "
      >

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.6,
          }}

          className="text-center"

        >

          {/* Small Heading */}

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-blue-300
            "
          >

            Start Today

          </p>

          {/* Main Heading */}

          <h2
            className="
              mx-auto
              mt-5
              max-w-4xl
              text-3xl
              font-semibold
              leading-tight
              text-white

              sm:text-4xl

              lg:text-5xl
            "
          >

            Make smarter financial decisions with AI.

          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-slate-300

              lg:text-lg
            "
          >

            Analyze loans, compare repayment strategies,
            estimate long-term savings, evaluate investment
            opportunities, and receive personalized
            AI-powered financial recommendations —
            all from one intelligent platform.

          </p>

          {/* Button */}

          <motion.button

            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={() => navigate("/dashboard")}

            className="
              mt-10
              w-full
              border
              border-blue-500
              bg-blue-600
              px-8
              py-4
              text-sm
              font-medium
              text-white
              transition-all
              duration-300

              hover:bg-blue-700
              hover:shadow-xl

              sm:w-auto
            "

          >

            Start Free Analysis

          </motion.button>

        </motion.div>

      </div>

    </section>

  );

}