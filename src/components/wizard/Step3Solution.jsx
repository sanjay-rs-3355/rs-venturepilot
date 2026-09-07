export default function Step3Solution({
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log("Step3 formData:", formData);
console.log("Solution value:", formData.solution);

  return (
    <div className="max-w-4xl space-y-5">

      <textarea
        rows="4"
        name="solution"
        placeholder="Describe your solution"
        value={formData.solution}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <textarea
        rows="3"
        name="uniqueness"
        placeholder="What makes your solution unique?"
        value={formData.uniqueness}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <input
        type="text"
        name="technology"
        placeholder="Technologies Used"
        value={formData.technology}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

    </div>
  );
}