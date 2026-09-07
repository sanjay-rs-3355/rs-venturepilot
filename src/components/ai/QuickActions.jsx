export default function QuickActions() {
  const actions = [
    "Improve Pitch",
    "Find Competitors",
    "Market Analysis",
    "Generate Roadmap",
    "Business Model",
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6">

      <h3 className="font-bold mb-4">
        Quick Actions
      </h3>

      <div className="space-y-3">

        {actions.map((action) => (
          <button
            key={action}
            className="w-full bg-blue-600 rounded-lg py-2 hover:bg-blue-700"
          >
            {action}
          </button>
        ))}

      </div>

    </div>
  );
}