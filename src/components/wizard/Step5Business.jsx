export default function Step5Business({
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

      <textarea
        rows="3"
        name="expectedImpact"
        placeholder="Expected Impact"
        value={formData.expectedImpact}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <input
        type="text"
        name="revenueModel"
        placeholder="Revenue Model"
        value={formData.revenueModel}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <textarea
        rows="3"
        name="vision"
        placeholder="Future Vision"
        value={formData.vision}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

    </div>
  );
}