export default function MetricCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-400">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}