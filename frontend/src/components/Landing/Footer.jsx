import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Top Section */}

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Prapti AI
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              An AI-powered financial intelligence platform designed to help
              users analyze loans, understand debt, compare repayment plans,
              estimate investment growth, and make smarter financial decisions.
            </p>

          </div>

          {/* Platform */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
              Platform
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-600">

              <li>Loan Analysis</li>

              <li>Debt Risk Assessment</li>

              <li>Investment Projection</li>

              <li>AI Financial Insights</li>

              <li>Dashboard</li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-600">

              <li>Documentation</li>

              <li>Privacy Policy</li>

              <li>Terms of Service</li>

              <li>Support</li>

              <li>FAQs</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">
              Contact
            </h3>

            <div className="mt-5 space-y-4 text-sm text-gray-600">

              <div className="flex items-center gap-3">

                <Mail size={16} />

                <span>prapti_ai212@gmail.com</span>

              </div>

              <div className="flex items-center gap-3">

                <Phone size={16} />

                <span>+91 98765 43210</span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin size={16} />

                <span>India</span>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 border-t border-gray-200"></div>

        {/* Bottom */}

        <div className="space-y-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <p className="text-sm text-gray-500">
              © 2026 Prapti AI. All Rights Reserved.
            </p>

            <p className="text-sm text-gray-500">
              Built for Educational & Portfolio Demonstration Purposes.
            </p>

          </div>

          <div className="border border-gray-200 bg-slate-50 p-6">

            <p className="text-xs leading-6 text-gray-500">

              <strong>Disclaimer:</strong> Prapti AI is an independent educational
              portfolio project developed to demonstrate modern full-stack web
              development, AI integration, and financial analytics. All financial
              values, charts, projections, loan calculations, AI recommendations,
              user profiles, investment returns, debt analyses, and other
              information displayed within this application are generated using
              sample or dummy data for demonstration purposes only. They should
              not be interpreted as financial, legal, investment, or tax advice.
              Users should always consult certified financial professionals before
              making real-world financial decisions.

            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}