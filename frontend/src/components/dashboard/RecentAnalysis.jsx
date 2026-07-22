import { useMemo, useState } from "react";
import {
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  Eye,
  Download,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../../context/AnalysisContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import api from "../../services/api";

export default function RecentAnalysis() {
  const navigate = useNavigate();

  const { history = [] } = useAnalysis();

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

  pdf.save(`Financial_Report_${item._id}.pdf`);
}
  return (
    
    <section
      className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-slate-200 px-6 py-5">

        <div>

          <h2 className="text-[22px] font-semibold text-slate-900">
            Recent Analysis
          </h2>

          <p className="mt-1 text-[14px] text-slate-500">
            View, export and manage your previous financial reports.
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search loan amount, goal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-[14px] outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {filteredHistory.length === 0 ? (

        <div className="flex h-52 items-center justify-center text-[15px] text-slate-500">
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
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 px-6 py-5 hover:bg-slate-50 transition"
              >
                <div className="flex items-start gap-4">

                  <div
                    className={`rounded-xl border p-3 ${badge}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-[17px] font-semibold text-slate-900">
                        ₹
                        {Number(
                          item.loanAmount || 0
                        ).toLocaleString("en-IN")}
                      </h3>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-700">
                        {item.goal || "Financial Planning"}
                      </span>

                    </div>

                    <p className="mt-2 text-[14px] text-slate-500">
                      {item.interestRate}% Interest •{" "}
                      {item.tenure} Years •{" "}
                      {item.investment}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-5 text-[13px] text-slate-500">

                      <div className="flex items-center gap-2">

                        <Clock3 size={15} />

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}

                      </div>

                      <div className="font-medium text-slate-700">
                        EMI ₹
                        {Number(item.emi || 0).toLocaleString(
                          "en-IN"
                        )}
                      </div>

                    </div>

                  </div>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-4">

                  <div
                    className={`rounded-full border px-4 py-2 text-[13px] font-semibold ${badge}`}
                  >
                    Health Score {score}/100
                  </div>

                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        navigate(`/reports?id=${item._id}`)
                      }
                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                    >
                       <ArrowUpRight size={16} />
                      View
                    </button>

                   <button
                    onClick={() => downloadReport(item)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                  >
                    <Download size={15} />
                    PDF
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
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 transition hover:border-violet-500 hover:text-violet-600"
                      >
                        <Mail size={15} />
                        Email
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