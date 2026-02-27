export default function RiskGauge({ score, status }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow text-center">
      <div className="text-6xl font-bold text-purple-500">{score}</div>
      <p className="mt-2 text-green-500 font-semibold">{status}</p>
      <p className="text-gray-400 mt-1">Future Resilience Score</p>
    </div>
  );
}