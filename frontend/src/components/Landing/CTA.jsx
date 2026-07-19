export default function CTA() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">

        <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
          Start Today
        </p>

        <h2 className="mt-4 text-4xl font-semibold">
          Make smarter financial decisions with AI.
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-gray-300 leading-7">
          Analyze loans, compare repayment plans, estimate long-term savings,
          and receive personalized AI-driven financial recommendations—all in one place.
        </p>

        <button
        onClick={()=>navigate("/dashboard")}
          className="
            mt-10
            border
            border-blue-500
            bg-blue-600
            px-8
            py-3
            text-sm
            font-medium
            transition
            hover:bg-blue-700
          "
        >
          Start Analysis
        </button>

      </div>
    </section>
  );
}