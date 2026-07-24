import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col lg:flex-row w-full overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full flex-1">
          <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 lg:p-10">

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Customize your Prapti AI experience.
            </p>

            <div className="mt-6 sm:mt-10 space-y-4 sm:space-y-6">

              <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                  Theme
                </h3>

                <p className="text-sm sm:text-base text-slate-500 mt-1">
                  Light Mode (Dark mode coming soon)
                </p>
              </div>

              <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                  Notifications
                </h3>

                <p className="text-sm sm:text-base text-slate-500 mt-1">
                  Email notifications are currently disabled.
                </p>
              </div>

              <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                  AI Model
                </h3>

                <p className="text-sm sm:text-base text-slate-500 mt-1">
                  DeepSeek Chat v3 via OpenRouter
                </p>
              </div>

              <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-sm">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                  Version
                </h3>

                <p className="text-sm sm:text-base text-slate-500 mt-1">
                  Prapti AI v1.0
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}