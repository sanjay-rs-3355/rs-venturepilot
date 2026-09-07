import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { analyzeStartup } from "./gemini";

const labels = { problem: "Problem clarity", customer: "Customer understanding", solution: "Solution clarity", market: "Market understanding", competition: "Differentiation", business: "Business viability", feasibility: "Feasibility", risk: "Risk readiness" };

export function buildAnalysis(startup) {
  const discovery = startup.discovery || {};
  const scores = startup.scores || {};
  const completed = Object.entries(discovery).filter(([, value]) => value?.answers);
  const strengths = completed.filter(([, value]) => (value.score || 0) >= 65).map(([key, value]) => `${labels[key]} is developing well at ${value.score}/100.`);
  const weaknesses = completed.filter(([, value]) => (value.score || 0) < 65).map(([key, value]) => `${labels[key]} needs more clarity or evidence (${value.score || 0}/100).`);
  const assumptions = startup.assumptions || [];
  const opportunities = ["Turn the lowest-confidence matrix into a five-conversation experiment.", "Use the refinement history to sharpen the first user and first use case."];
  const threats = assumptions.slice(0, 3).map((assumption) => assumption.statement);
  const missions = [
    { id: "problem_interviews", title: "Interview people who live with the problem", why: "Problem quality is not evidence confidence.", method: "Run 5 short conversations without pitching the solution.", success: "At least 3 people describe the same problem unprompted." },
    { id: "solution_test", title: "Test the smallest useful solution", why: "A clear concept still needs observed behavior.", method: "Show a clickable sketch or manual version to 5 target users.", success: "3 users complete the key action without explanation." },
    { id: "payment_signal", title: "Find a willingness-to-pay signal", why: "Pricing is an assumption until someone commits value.", method: "Ask for a real commitment, pilot, deposit, or signed intent.", success: "At least 2 target customers make a concrete commitment." },
  ];
  return { scores, strengths, weaknesses, swot: { strengths, weaknesses, opportunities, threats }, missions, assumptions };
}

export async function saveAnalysis(id, analysis) {
  await updateDoc(doc(db, "ideas", id), { analysis: { ...analysis.swot, missions: analysis.missions, updatedAt: new Date().toISOString() }, validation: { missions: analysis.missions }, updatedAt: new Date().toISOString() });
}

export async function buildAIAnalysis(startup) {
  const localAnalysis = buildAnalysis(startup);

  try {
    const generated = await analyzeStartup(startup);
    if (!generated?.swot || !Array.isArray(generated.missions)) return localAnalysis;
    return { ...localAnalysis, ...generated, scores: startup.scores || localAnalysis.scores };
  } catch {
    return localAnalysis;
  }
}
