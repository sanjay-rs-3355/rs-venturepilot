export default function WeaknessesCard() {

  const weaknesses = [
    "Revenue model needs improvement",
    "Competitor analysis missing",
    "Technology stack unclear",
  ];

  return (
    <div className="bg-red-900 rounded-xl p-5">

      <h2 className="text-xl font-bold mb-4">
        ⚠ Weaknesses
      </h2>

      <ul className="space-y-2">

        {weaknesses.map((item) => (

          <li key={item}>
            • {item}
          </li>

        ))}

      </ul>

    </div>
  );
}
    