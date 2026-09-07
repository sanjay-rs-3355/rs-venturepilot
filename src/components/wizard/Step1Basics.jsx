export default function Step1Basics({
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
        name="title"
        placeholder="Startup Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

      <select
        name="domain"
        value={formData.domain}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      >
        <option value="">Select Domain</option>

        <option>Artificial Intelligence</option>
        <option>Healthcare</option>
        <option>Education</option>
        <option>Agriculture</option>
        <option>FinTech</option>
        <option>E-Commerce</option>
        <option>Cybersecurity</option>
        <option>IoT</option>
        <option>Sustainability</option>
      </select>

      <textarea
        rows="4"
        name="elevatorPitch"
        placeholder="One-line Elevator Pitch"
        value={formData.elevatorPitch}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700"
      />

    </div>
  );
}