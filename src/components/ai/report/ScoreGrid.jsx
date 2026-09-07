import AnalysisCard from "../AnalysisCard";

export default function ScoreGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <AnalysisCard
        title="Innovation"
        score={92}
        color="text-green-400"
      />

      <AnalysisCard
        title="Market"
        score={81}
        color="text-blue-400"
      />

      <AnalysisCard
        title="Business"
        score={76}
        color="text-yellow-400"
      />

      <AnalysisCard
        title="Feasibility"
        score={88}
        color="text-purple-400"
      />

    </div>
  );
}