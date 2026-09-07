import { useNavigate } from "react-router-dom";
import { calculateProgress } from "../../utils/startupProgress";

export default function StartupCard({ startup }) {

  const navigate = useNavigate();
  const progress = calculateProgress(startup);
  <div className="mt-4">

  <div className="flex justify-between text-sm">

    <span>Progress</span>

    <span>{progress}%</span>

  </div>

  <div className="w-full h-2 bg-slate-700 rounded-full mt-2">

    <div
      className={`px-4 py-2 rounded-full text-white
${
  startup.status === "draft"
    ? "bg-yellow-500"
    : startup.status === "submitted"
    ? "bg-blue-600"
    : startup.status === "approved"
    ? "bg-green-600"
    : startup.status === "rejected"
    ? "bg-red-600"
    : "bg-gray-600"
}`}
      style={{ width: `${progress}%` }}
    />

  </div>

</div>
  return (
    <div
      onClick={() => navigate(`/idea/${startup.id}`)}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition cursor-pointer"
    >

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            🚀 {startup.basics?.title}
          </h2>

          <p className="text-slate-400 mt-2">
            {startup.basics?.domain}
          </p>

          <p className="text-slate-500 text-sm mt-3">
            {startup.createdAt?.slice(0, 10)}
          </p>

        </div>

        <span className="bg-blue-600 px-4 py-2 rounded-full capitalize">
          {startup.status}
        </span>

      </div>

    </div>
  );
}