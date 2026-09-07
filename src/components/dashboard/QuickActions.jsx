import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const navigate = useNavigate();

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

        <button
          onClick={() => navigate("/startup-wizard")}
          className="bg-blue-600 p-5 rounded-xl"
        >
          ➕ New Startup
        </button>

        <button
          onClick={() => navigate("/my-ideas")}
          className="bg-green-600 p-5 rounded-xl"
        >
          💡 My Ideas
        </button>

        <button
          className="bg-purple-600 p-5 rounded-xl"
        >
          🤖 AI Reports
        </button>

        <button
          className="bg-orange-600 p-5 rounded-xl"
        >
          👨‍🏫 Mentor Feedback
        </button>

        <button
          className="bg-cyan-600 p-5 rounded-xl"
        >
          🏢 Incubation
        </button>

        <button
          className="bg-pink-600 p-5 rounded-xl"
        >
          📊 Analytics
        </button>

      </div>

    </div>
  );
}