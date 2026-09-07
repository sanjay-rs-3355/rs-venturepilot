import AIAvatar from "./AIAvatar";
import ScoreCard from "./ScoreCard";
import QuickActions from "./QuickActions";

export default function Sidebar() {
  return (
    <div className="w-1/3 space-y-6">

      <AIAvatar />

      <ScoreCard />

      <QuickActions />

    </div>
  );
}