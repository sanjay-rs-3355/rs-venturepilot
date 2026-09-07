export default function OverallScore({ score }) {
  return (
    <div className="bg-slate-800 rounded-xl p-8 text-center">

      <h2 className="text-2xl font-bold">
        Overall AI Score
      </h2>

      <div className="text-7xl font-bold text-green-400 mt-6">
        {score}/100
      </div>

      <p className="mt-4 text-slate-400">
        Startup Readiness
      </p>

    </div>
  );
}