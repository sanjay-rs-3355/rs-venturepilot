export default function Step2Problem({
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
        rows="4"
        name="problem"
        placeholder="Describe the problem your startup solves"
        value={formData.problem}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <input
        type="text"
        name="affectedUsers"
        placeholder="Who faces this problem?"
        value={formData.affectedUsers}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <input
        type="text"
        name="frequency"
        placeholder="How frequently does this problem occur?"
        value={formData.frequency}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <textarea
        rows="3"
        name="importance"
        placeholder="Why is solving this problem important?"
        value={formData.importance}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

    </div>
  );
}