import { useEffect, useState } from "react";
import { Download, Trash2, FolderOpen } from "lucide-react";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import {
  getAllOfflineReports,
  getOfflineReport,
  deleteOfflineReport,
} from "../../utils/offlineDB";

export default function OfflineReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const data = await getAllOfflineReports();
    setReports(data);
  }

  async function openReport(id) {
    const report = await getOfflineReport(id);

    if (!report) return;

    const url = URL.createObjectURL(report.pdf);

    window.open(url, "_blank");
  }

  async function removeReport(id) {
    await deleteOfflineReport(id);
    loadReports();
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <div className="max-w-6xl mx-auto p-8">

          <div className="mb-8">

            <p className="uppercase tracking-[0.3em] text-xs text-blue-600">
              Offline Storage
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Offline Reports
            </h1>

            <p className="mt-3 text-slate-500">
              These reports are available even without internet.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

            {reports.length === 0 ? (

              <div className="py-20 text-center">

                <Download
                  className="mx-auto text-slate-300"
                  size={60}
                />

                <h2 className="mt-6 text-2xl font-semibold text-slate-700">
                  No Offline Reports
                </h2>

                <p className="mt-2 text-slate-500">
                  Download a report first.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-slate-100">

                {reports.map((report) => (

                  <div
                    key={report.id}
                    className="flex items-center justify-between p-6"
                  >

                    <div>

                      <h3 className="font-semibold text-lg text-slate-900">
                        Financial Report
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Saved on{" "}
                        {new Date(
                          report.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          openReport(report.id)
                        }
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                      >
                        <FolderOpen size={18} />
                        Open
                      </button>

                      <button
                        onClick={() =>
                          removeReport(report.id)
                        }
                        className="flex items-center gap-2 rounded-xl border border-red-300 px-5 py-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}