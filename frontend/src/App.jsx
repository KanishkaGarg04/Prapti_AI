import { useState } from "react";

import Navbar from "./components/common/Navbar";
import AnalysisForm from "./components/dashboard/AnalysisForm";
import SummaryPanel from "./components/dashboard/SummaryPanel";


function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (data) => {
  console.log(data);

  setAnalysisResult({
    risk: {
      emi_monthly: 18420,
      risk: {
        risk_score: 41,
        category: "Low Risk",
        burden_ratio_percent: 31,
      },
    },

    optimize: {
      interest_saved: 487500,
    },
  });
};

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8">

          <h1 className="text-2xl font-semibold text-gray-900">
            Financial Analysis Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Analyze loan affordability, financial risk, and long-term debt
            impact using intelligent financial insights.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-5">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <AnalysisForm
              onAnalyze={handleAnalyze}
            />

          </div>

          {/* RIGHT */}

          <div className="space-y-6 lg:col-span-3">

            {loading ? (

              <div className="flex h-80 items-center justify-center border border-gray-200 bg-white">

                <p className="text-sm text-gray-500">
                  Running Financial Analysis...
                </p>

              </div>

            ) : (

              <SummaryPanel
                result={analysisResult}
              />

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;