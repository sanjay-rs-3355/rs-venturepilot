import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { calculateEvidenceConfidence, calculateMatrixScore, calculateOverallScores } from "../utils/scoring";

export async function saveMatrixAnswers(id, matrixId, questions, answers, existingDiscovery = {}) {
  if (!auth.currentUser) throw new Error("You must be signed in to save discovery work.");
  const score = calculateMatrixScore(questions, answers);
  const evidenceConfidence = calculateEvidenceConfidence(questions, answers);
  const discovery = { ...existingDiscovery, [matrixId]: { answers, score, evidenceConfidence, status: "assumption", updatedAt: new Date().toISOString() } };
  const scores = calculateOverallScores(discovery);
  const completedMatrices = Object.keys(discovery).filter((key) => discovery[key]?.score > 0);
  const workflow = { currentStage: "discover", currentMatrix: matrixId, progress: Math.round((completedMatrices.length / 8) * 100), completedMatrices };
  const assumptions = questions.filter((question) => answers[question.id]).map((question) => ({ id: `${matrixId}_${question.id}`, statement: `${question.label}: ${answers[question.id]}`, status: "yellow", confidence: evidenceConfidence, source: matrixId }));

  await updateDoc(doc(db, "ideas", id), {
    [`discovery.${matrixId}`]: discovery[matrixId],
    scores,
    workflow,
    assumptions: arrayUnion(...assumptions),
    updatedAt: new Date().toISOString(),
  });
  return { discovery, scores, workflow };
}
