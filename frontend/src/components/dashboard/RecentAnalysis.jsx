import { useMemo, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  Download,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../../context/AnalysisContext";
import jsPDF from "jspdf";
import api from "../../services/api";
import { saveOfflineReport } from "../../utils/offlineDB";

function AnalysisSkeleton() {
  return (
    <div className="divide-y divide-slate-100">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-6 lg:px-8 py-6 animate-pulse"
        >
          <div className="flex items-start gap-4 flex-1">

            <div className="h-12 w-12 rounded-xl bg-slate-200" />

            <div className="flex-1 space-y-3">

              <div className="h-5 w-40 rounded bg-slate-200" />

              <div className="h-4 w-64 rounded bg-slate-200" />

              <div className="h-4 w-48 rounded bg-slate-200" />

            </div>

          </div>

          <div className="space-y-3">

            <div className="h-8 w-32 rounded-full bg-slate-200" />

            <div className="flex gap-2">

              <div className="h-10 w-24 rounded-xl bg-slate-200" />

              <div className="h-10 w-36 rounded-xl bg-slate-200" />

              <div className="h-10 w-24 rounded-xl bg-slate-200" />

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

export default function RecentAnalysis() {
  const navigate = useNavigate();

  const {
  history = [],
  historyLoading,
} = useAnalysis();

  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {
    if (!Array.isArray(history)) return [];

    return history.filter((item) => {
      const loan = String(item.loanAmount || "");
      const goal = String(item.goal || "").toLowerCase();
      const risk = String(item.investment || "").toLowerCase();

      return (
        loan.includes(search) ||
        goal.includes(search.toLowerCase()) ||
        risk.includes(search.toLowerCase())
      );
    });
  }, [history, search]);

  if (!Array.isArray(history)) return null;

  async function downloadReport(item) {
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(22);
    pdf.text("Prapti AI Financial Report", 20, 20);

    pdf.setFontSize(12);

    let y = 40;

    const rows = [
      ["Loan Amount", `₹${Number(item.loanAmount).toLocaleString("en-IN")}`],
      ["Interest Rate", `${item.interestRate}%`],
      ["Loan Tenure", `${item.tenure} Years`],
      ["Monthly EMI", `₹${Number(item.emi).toLocaleString("en-IN")}`],
      ["Monthly Income", `₹${Number(item.monthlyIncome).toLocaleString("en-IN")}`],
      ["Monthly Expenses", `₹${Number(item.monthlyExpenses).toLocaleString("en-IN")}`],
      ["Health Score", `${item.healthScore}/100`],
      ["Debt Ratio", `${item.debtRatio}%`],
      ["Savings Rate", `${item.savingsRate}%`],
      ["Goal", item.goal],
    ];

    rows.forEach(([k, v]) => {
      pdf.text(`${k}: ${v}`, 20, y);
      y += 10;
    });

    y += 10;

    pdf.setFontSize(16);
    pdf.text("AI Recommendation", 20, y);

    y += 10;

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(
      item.recommendation || "No recommendation available.",
      170
    );

    pdf.text(lines, 20, y);

    const blob = pdf.output("blob");

      await saveOfflineReport(item._id, blob);

      pdf.save(`Financial_Report_${item._id}.pdf`);
  }

  return (
    <section
      className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full max-w-full"
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 truncate">
            Recent Analysis
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-500 truncate">
            View, export and manage your previous financial reports.
          </p>
        </div>

        <div className="relative w-full lg:w-80 shrink-0">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search loan amount, goal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {historyLoading ? (
  <AnalysisSkeleton />
) : filteredHistory.length === 0 ? (
        <div className="flex h-52 items-center justify-center text-xs sm:text-sm text-slate-500 px-4 text-center">
          No previous analysis found.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {filteredHistory.map((item, index) => {
            const score = item.healthScore ?? 0;

            let Icon = CheckCircle2;
            let badge =
              "bg-emerald-50 text-emerald-700 border-emerald-200";

            if (score < 50) {
              Icon = AlertTriangle;
              badge =
                "bg-rose-50 text-rose-700 border-rose-200";
            } else if (score < 75) {
              Icon = TrendingUp;
              badge =
                "bg-amber-50 text-amber-700 border-amber-200";
            }

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 hover:bg-slate-50 transition"
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className={`rounded-xl border p-2.5 sm:p-3 shrink-0 ${badge}`}
                  >
                    <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                        ₹
                        {Number(
                          item.loanAmount || 0
                        ).toLocaleString("en-IN")}
                      </h3>

                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium text-blue-700 truncate max-w-[200px]">
                        {item.goal || "Financial Planning"}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs sm:text-sm text-slate-500 truncate">
                      {item.interestRate}% Interest •{" "}
                      {item.tenure} Years •{" "}
                      {item.investment}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Clock3 size={14} />
                        <span>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="font-medium text-slate-700 shrink-0">
                        EMI ₹
                        {Number(item.emi || 0).toLocaleString(
                          "en-IN"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div
                    className={`rounded-full border px-3 py-1 text-xs sm:text-[13px] font-semibold ${badge}`}
                  >
                    Health Score {score}/100
                  </div>

                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button
                      onClick={() =>
                        navigate(`/reports?id=${item._id}`)
                      }
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-[13px] font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                    >
                      <ArrowUpRight size={15} />
                      <span>View</span>
                    </button>

                   <button
                      onClick={() => navigate(`/reports?id=${item._id}`)}
                      className="
                        flex items-center gap-2
                        rounded-lg
                        bg-blue-600
                        px-4 py-2
                        text-sm font-medium text-white
                        transition
                        hover:bg-blue-700
                        active:scale-95
                      "
                    >
                      <Download size={16} />
                      Download PDF
                    </button>

                    <button
                      onClick={async () => {
                        const email = prompt("Enter recipient email");

                        if (!email) return;

                        try {
                          await api.post("/analysis/email", {
                            email,
                            report: item,
                          });

                          alert("✅ Report sent successfully!");
                        } catch (err) {
                          console.error(err);

                          alert("❌ Failed to send email.");
                        }
                      }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-[13px] font-medium text-slate-700 transition hover:border-violet-500 hover:text-violet-600"
                    >
                      <Mail size={14} />
                      <span>Email</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}