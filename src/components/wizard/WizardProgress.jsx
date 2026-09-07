export default function WizardProgress({ step }) {
  return (
    <>
      <p className="text-slate-400 mb-6">
        Step {step} of 5
      </p>

      <div className="w-full max-w-4xl bg-slate-700 rounded-full h-3 mb-10">
        <div
          className="bg-blue-600 h-3 rounded-full duration-300"
          style={{
            width: `${step * 20}%`,
          }}
        />
      </div>
    </>
  );
}