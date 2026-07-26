import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/pages/LandingPage";
import DashboardPage from "./components/pages/DashboardPage";
import History from "./components/pages/History";
import Reports from "./components/pages/Reports";
import Settings from "./components/pages/Settings";

import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

import PrivateRoute from "./components/auth/PrivateRoute";
import OfflineReports from "./components/pages/OfflineReports";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/offline"
          element={<OfflineReports />}
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}