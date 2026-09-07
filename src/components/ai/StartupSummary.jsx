export default function StartupSummary({
  startup,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        🚀 Startup Summary
      </h2>

      <p>
        <strong>Title:</strong>{" "}
        {startup?.basics?.title}
      </p>

      <p>
        <strong>Domain:</strong>{" "}
        {startup?.basics?.domain}
      </p>

      <p className="mt-4">
        {startup?.basics?.elevatorPitch}
      </p>

    </div>
  );
}