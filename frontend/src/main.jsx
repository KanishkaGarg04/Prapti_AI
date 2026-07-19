import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AnalysisProvider } from "./context/AnalysisContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnalysisProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            border: "1px solid #dbeafe",
            padding: "14px",
            borderRadius: "12px",
          },
        }}
      />

      <App />
    </AnalysisProvider>
  </React.StrictMode>
);