import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <div className="p-8">
          <div className="rounded-xl bg-white border shadow-sm p-8">

            <h1 className="text-3xl font-bold">
              Settings
            </h1>

            <p className="mt-2 text-gray-500">
              Customize your Prapti AI experience.
            </p>

            <div className="mt-10 space-y-6">

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg">
                  Theme
                </h3>

                <p className="text-gray-500 mt-1">
                  Light Mode (Dark mode coming soon)
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg">
                  Notifications
                </h3>

                <p className="text-gray-500 mt-1">
                  Email notifications are currently disabled.
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg">
                  AI Model
                </h3>

                <p className="text-gray-500 mt-1">
                  DeepSeek Chat v3 via OpenRouter
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-semibold text-lg">
                  Version
                </h3>

                <p className="text-gray-500 mt-1">
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