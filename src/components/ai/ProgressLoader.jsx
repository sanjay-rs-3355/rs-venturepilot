import { useEffect, useState } from "react";

const steps = [
  "Reading Startup Details...",
  "Understanding Problem...",
  "Searching Competitors...",
  "Evaluating Innovation...",
  "Generating Suggestions...",
];

export default function ProgressLoader() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrent(current + 1);
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [current]);

  return (
    <div className="space-y-4">

      {steps.map((step, index) => (
        <div key={step}>

          {index < current && (
            <p className="text-green-400">
              ✅ {step}
            </p>
          )}

          {index === current && (
            <p className="text-yellow-400 animate-pulse">
              ⏳ {step}
            </p>
          )}

          {index > current && (
            <p className="text-slate-500">
              ○ {step}
            </p>
          )}

        </div>
      ))}

    </div>
  );
}