import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import { useAnalysis } from "../../context/AnalysisContext";

export default function Reports() {
  const { history } = useAnalysis();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const report = useMemo(() => {
    if (!id) return null;

    return history.find((item) => item._id === id);
  }, [history, id]);

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <main className="flex-1">

        <Topbar />

        <div className="p-8">

          <div className="rounded-xl border bg-white shadow-sm p-8">

            <h2 className="text-3xl font-bold">
              Financial Report
            </h2>

            {!report ? (

              <div className="mt-10 text-center text-gray-500">

                Select a report from Analysis History.

              </div>

            ) : (

              <div className="mt-8 space-y-8">

                <div className="grid md:grid-cols-2 gap-6">

                  <Info
                    title="Loan Amount"
                    value={`₹${Number(report.loanAmount).toLocaleString("en-IN")}`}
                  />

                  <Info
                    title="Interest Rate"
                    value={`${report.interestRate}%`}
                  />

                  <Info
                    title="Loan Tenure"
                    value={`${report.tenure} Years`}
                  />

                  <Info
                    title="Monthly EMI"
                    value={`₹${Number(report.emi).toLocaleString("en-IN")}`}
                  />

                  <Info
                    title="Health Score"
                    value={`${report.healthScore}/100`}
                  />

                  <Info
                    title="Goal"
                    value={report.goal}
                  />

                </div>

                <div className="rounded-xl border p-6">

                  <h3 className="font-semibold text-lg mb-4">
                    AI Recommendation
                  </h3>

                  <p className="text-gray-700 whitespace-pre-line">

                    {report.recommendation}

                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-lg border p-5">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {value}
      </h3>

    </div>
  );
}