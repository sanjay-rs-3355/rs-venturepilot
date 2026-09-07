export default function Step4Market({
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl space-y-5">

      <input
        type="text"
        name="targetAudience"
        placeholder="Target Audience"
        value={formData.targetAudience}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <textarea
        rows="3"
        name="competitors"
        placeholder="Existing Competitors"
        value={formData.competitors}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <textarea
        rows="3"
        name="competitiveAdvantage"
        placeholder="Why will customers choose you?"
        value={formData.competitiveAdvantage}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

    </div>
  );
}