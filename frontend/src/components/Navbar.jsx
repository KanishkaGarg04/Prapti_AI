export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-purple-600">Future Ready Finance</h1>
      <div className="space-x-6 text-gray-600">
        <a>Features</a>
        <a>Risk Score</a>
        <a>Simulator</a>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
          Start Assessment
        </button>
      </div>
    </nav>
  );
}