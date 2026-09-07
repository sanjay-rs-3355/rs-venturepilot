export default function StrengthsCard() {

  const strengths = [
    "Strong Innovation",
    "Clear Problem Statement",
    "Large Target Audience",
  ];

  return (
    <div className="bg-green-900 rounded-xl p-5">

      <h2 className="text-xl font-bold mb-4">
        ✅ Strengths
      </h2>

      <ul className="space-y-2">

        {strengths.map((item) => (

          <li key={item}>
            ✔ {item}
          </li>

        ))}

      </ul>

    </div>
  );
}