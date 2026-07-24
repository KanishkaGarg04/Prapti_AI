import {
  Mail,
  Phone,
  MapPin,
  Landmark,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
        "
      >

        {/* Top */}

        <div
          className="
            grid
            grid-cols-1
            gap-12

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <Landmark
                size={22}
                className="text-blue-600"
              />

              <h2 className="text-2xl font-semibold text-gray-900">
                Prapti AI
              </h2>

            </div>

            <p
              className="
                mt-6
                text-sm
                leading-8
                text-gray-600
              "
            >
              An AI-powered financial intelligence platform
              helping users analyze loans, evaluate debt,
              compare repayment strategies, estimate
              investment growth, and make smarter financial
              decisions.
            </p>

          </div>

          {/* Platform */}

          <div>

            <h3
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-gray-900
              "
            >
              Platform
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-gray-600">

              <li>Loan Analysis</li>

              <li>Debt Risk Assessment</li>

              <li>Investment Projection</li>

              <li>AI Financial Insights</li>

              <li>Dashboard</li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-gray-900
              "
            >
              Resources
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-gray-600">

              <li>Documentation</li>

              <li>Privacy Policy</li>

              <li>Terms of Service</li>

              <li>Support</li>

              <li>FAQs</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-gray-900
              "
            >
              Contact
            </h3>

            <div className="mt-6 space-y-5 text-sm text-gray-600">

              <div className="flex items-center gap-3">

                <Mail
                  size={17}
                  className="text-blue-600"
                />

                <span className="break-all">
                  prapti_ai212@gmail.com
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={17}
                  className="text-blue-600"
                />

                <span>
                  +91 98765 43210
                </span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin
                  size={17}
                  className="text-blue-600"
                />

                <span>
                  India
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-12 border-t border-gray-200"></div>

        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <p className="text-sm text-gray-500">

            © 2026 Prapti AI. All Rights Reserved.

          </p>

          <p className="text-sm text-gray-500">

            Built for Educational & Portfolio Demonstration Purposes.

          </p>

        </div>

        {/* Disclaimer */}

        <div
          className="
            mt-10
            border
            border-gray-200
            bg-slate-50
            p-5

            sm:p-6

            lg:p-8
          "
        >

          <p
            className="
              text-xs
              leading-7
              text-gray-500

              sm:text-sm
            "
          >

            <strong>Disclaimer:</strong>{" "}

            Prapti AI is an independent educational portfolio
            project developed to demonstrate modern
            full-stack development, AI integration,
            financial analytics, and intelligent user
            experiences.

            All financial values, investment projections,
            loan calculations, AI recommendations,
            dashboards, charts, repayment strategies,
            and other information displayed throughout
            this application are generated using
            demonstration or sample data.

            They should not be interpreted as financial,
            investment, legal, or tax advice.

            Always consult certified financial
            professionals before making real-world
            financial decisions.

          </p>

        </div>

      </div>

    </footer>
  );
}