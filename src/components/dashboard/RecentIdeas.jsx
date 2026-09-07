import StartupCard from "./StartupCard";

export default function RecentIdeas({
  startups,
}) {

  return (

    <div className="mb-10">

      <h2 className="text-3xl font-bold mb-6">

        Recent Startups

      </h2>

      <div className="space-y-5">

        {startups.map(startup => (

          <StartupCard
            key={startup.id}
            startup={startup}
          />

        ))}

      </div>

    </div>

  );
}