export default function StatsCards({ dashboard }) {
const stats = [
  {
    title: "My Startups",
    value: dashboard.total,
    icon: "🚀",
    color: "bg-blue-600",
  },
  {
    title: "Drafts",
    value: dashboard.drafts,
    icon: "📝",
    color: "bg-yellow-500",
  },
  {
    title: "Submitted",
    value: dashboard.submitted,
    icon: "📤",
    color: "bg-purple-600",
  },
  {
    title: "Approved",
    value: dashboard.approved,
    icon: "✅",
    color: "bg-green-600",
  },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500 transition"
        >

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.color}`}
          >
            {item.icon}
          </div>

          <h3 className="text-slate-400 mt-4">
            {item.title}
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {item.value}
          </h1>

        </div>
      ))}

    </div>
  );
}