import { Calculator } from "lucide-react";

export default function AnalysisWorkspace() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Financial Analysis
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Analyze your loan affordability, debt burden, and future financial
          stability.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">

        {/* Left */}

        <section className="lg:col-span-2 rounded-md border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Calculator
              size={18}
              className="text-blue-600"
            />

            <h2 className="text-base font-semibold">
              Loan Information
            </h2>

          </div>

          <div className="mt-6 space-y-5">

            <Input
              label="Monthly Income"
              placeholder="₹ 80,000"
            />

            <Input
              label="Existing EMI"
              placeholder="₹ 15,000"
            />

            <Input
              label="Loan Amount"
              placeholder="₹ 20,00,000"
            />

            <Input
              label="Interest Rate"
              placeholder="8.5%"
            />

            <Input
              label="Tenure"
              placeholder="20 Years"
            />

            <button className="mt-2 w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white hover:bg-black transition">
              Analyze
            </button>

          </div>

        </section>

        {/* Right */}

        <section className="lg:col-span-3 rounded-md border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-base font-semibold">
                Analysis Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Results will appear after running the analysis.
              </p>

            </div>

          </div>

          <div className="mt-8 flex h-[350px] items-center justify-center rounded-md border border-dashed border-gray-300">

            <p className="text-sm text-gray-400">
              No analysis available.
            </p>

          </div>

        </section>

      </div>

    </main>
  );
}

function Input({ label, placeholder }) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
      />

    </div>
  );
}