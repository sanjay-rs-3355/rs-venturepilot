const evidenceValues = {
  "No evidence yet": 0,
  Anecdotal: 25,
  "Several conversations": 50,
  "Observed behavior": 75,
  "Measured evidence": 100,
};

export function calculateMatrixScore(questions, answers) {
  const answered = questions.filter((question) => answers?.[question.id] !== undefined && answers[question.id] !== "");
  const quality = answered.length ? Math.round((answered.length / questions.length) * 100) : 0;
  const textDepth = answered.filter((question) => typeof answers[question.id] === "string" && answers[question.id].length > 35).length;
  return Math.min(100, Math.round(quality * 0.7 + (textDepth / Math.max(1, questions.length)) * 30));
}

export function calculateEvidenceConfidence(questions, answers) {
  const evidenceAnswers = questions.filter((question) => question.type === "evidence").map((question) => evidenceValues[answers?.[question.id]] || 0);
  const confidenceAnswers = questions.filter((question) => question.type === "confidence").map((question) => Number(answers?.[question.id] || 0) * 20);
  const signals = [...evidenceAnswers, ...confidenceAnswers];
  return signals.length ? Math.round(signals.reduce((sum, value) => sum + value, 0) / signals.length) : 0;
}

export function calculateOverallScores(discovery = {}) {
  const keys = ["problem", "customer", "solution", "market", "competition", "business", "feasibility", "risk"];
  const scores = {};
  keys.forEach((key) => { scores[key] = discovery[key]?.score || 0; });
  const values = keys.map((key) => scores[key]);
  const evidence = keys.map((key) => discovery[key]?.evidenceConfidence || 0);
  scores.evidence = Math.round(evidence.reduce((sum, value) => sum + value, 0) / keys.length);
  scores.overallReadiness = Math.round(values.reduce((sum, value) => sum + value, 0) / keys.length);
  scores.ideaQuality = Math.round(values.reduce((sum, value) => sum + value, 0) / keys.length);
  scores.evidenceConfidence = scores.evidence;
  scores.differentiation = scores.competition;
  return scores;
}
