export default function WizardButtons({
  step,
  setStep,
  onSaveDraft,
  onFinish,
}) {
  return (
    
    <div className="mt-10 flex justify-between max-w-4xl">

      <button
        disabled={step === 1}
        onClick={() => setStep(step - 1)}
        className="bg-slate-700 px-6 py-3 rounded disabled:opacity-40"
      >
        ← Previous
      </button>

      <button
        onClick={onSaveDraft}
        className="bg-slate-800 px-6 py-3 rounded"
      >
        Save draft
      </button>

      <button
        onClick={() => {
          if (step < 5) {
            setStep(step + 1);
          } else {
            onFinish();
          }
        }}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        {step === 5 ? "🚀 Complete Startup" : "Next →"}
      </button>


    </div>
  );
}