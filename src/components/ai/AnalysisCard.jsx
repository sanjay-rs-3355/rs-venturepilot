export default function AnalysisCard({
  title,
  score,
  color,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-5">

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <div
        className={`text-5xl font-bold mt-3 ${color}`}
      >
        {score}%
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full mt-4">

        <div
          className={`h-2 rounded-full ${color.replace("text", "bg")}`}
          style={{ width: `${score}%` }}
        />

      </div>

    </div>
  );
}