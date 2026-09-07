export default function MatrixQuestionRenderer({ question, value, onChange }) {
  const currentValue = value || "";

  if (question.type === "longText" || question.type === "text") {
    return <textarea rows={question.type === "longText" ? 5 : 3} value={currentValue} onChange={(event) => onChange(event.target.value)} placeholder={question.placeholder} />;
  }

  if (question.type === "singleChoice" || question.type === "scale") {
    return <div className="vp-choice-grid">{question.options.map((option, index) => <button type="button" key={option} className={`vp-choice-card ${currentValue === option ? "is-selected" : ""}`} onClick={() => onChange(option)}><span>{String(index + 1).padStart(2, "0")}</span>{option}</button>)}</div>;
  }

  if (question.type === "confidence") {
    return <div className="vp-confidence-grid">{[1, 2, 3, 4, 5].map((score) => <button type="button" key={score} className={`vp-confidence-option ${String(currentValue) === String(score) ? "is-selected" : ""}`} onClick={() => onChange(score)}><strong>{score}</strong><span>{["Guess", "Low", "Mixed", "Good", "Certain"][score - 1]}</span></button>)}</div>;
  }

  if (question.type === "evidence") {
    return <div className="vp-evidence-grid">{["No evidence yet", "Anecdotal", "Several conversations", "Observed behavior", "Measured evidence"].map((option, index) => <button type="button" key={option} className={`vp-evidence-option ${currentValue === option ? "is-selected" : ""}`} onClick={() => onChange(option)}><span className="vp-evidence-bar" style={{ height: `${18 + index * 10}px` }} />{option}</button>)}</div>;
  }

  return null;
}
