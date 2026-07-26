import {
  createContext,
  useContext,
  useState,
} from "react";

const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  const [analysis, setAnalysis] = useState(null);

  const [history, setHistory] = useState([]);

  // Analysis Loading (while AI analysis runs)
  const [loading, setLoading] = useState(false);

  // History Loading (while dashboard loads)
  const [historyLoading, setHistoryLoading] = useState(true);

  return (
    <AnalysisContext.Provider
      value={{
        analysis,
        setAnalysis,

        history,
        setHistory,

        loading,
        setLoading,

        historyLoading,
        setHistoryLoading,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  return useContext(AnalysisContext);
}