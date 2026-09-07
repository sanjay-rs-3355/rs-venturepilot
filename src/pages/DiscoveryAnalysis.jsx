import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStartup } from "../services/startupService";
import { normalizeStartup } from "../utils/dataNormalization";
import { buildAIAnalysis, saveAnalysis } from "../services/analysisService";

const scoreLabels = { problem: "Problem", customer: "Customer", solution: "Solution", differentiation: "Differentiation", market: "Market", competition: "Competition", business: "Business", feasibility: "Feasibility", evidence: "Evidence", risk: "Risk" };

export default function DiscoveryAnalysis() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => { getStartup(id).then(async (data) => { const normalized = normalizeStartup(data); setStartup(normalized); setAnalysis(await buildAIAnalysis(normalized)); }); }, [id]);
  if (!startup || !analysis) return <div className="vp-loading-state">Turning your discoveries into a useful readout...</div>;
  const scores = startup.scores || {};
  const persist = async () => { await saveAnalysis(id, analysis); setSaved(true); setTimeout(() => setSaved(false), 1600); };
  return <div className="vp-analysis-page"><div className="vp-page-heading-row"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Analysis</div><h1>What your idea is telling us.</h1><p>Not a verdict. A clear read on what is promising, what is assumed, and what to learn next.</p></div><Link className="vp-secondary-button" to={`/discover/${id}/blueprint`}>Open blueprint →</Link></div><section className="vp-score-hero"><div><span className="vp-eyebrow">Overall readiness</span><strong>{scores.overallReadiness || 0}<small>/100</small></strong><p>Idea quality <b>{scores.ideaQuality || 0}</b> · Evidence confidence <b>{scores.evidenceConfidence || 0}</b></p></div><div className="vp-score-ring"><span>{scores.evidenceConfidence || 0}%</span><small>evidence</small></div></section><section className="vp-analysis-section"><div className="vp-section-title"><div><span className="vp-eyebrow">Readiness breakdown</span><h2>Signal by signal</h2></div></div><div className="vp-score-grid">{Object.entries(scoreLabels).map(([key, label]) => <div className="vp-score-row" key={key}><span>{label}</span><div><i style={{ width: `${scores[key] || 0}%` }} /></div><strong>{scores[key] || 0}</strong></div>)}</div></section><section className="vp-swot-grid">{[["Strengths", analysis.swot.strengths, "is-strength"], ["Needs attention", analysis.swot.weaknesses, "is-weakness"], ["Opportunities", analysis.swot.opportunities, "is-opportunity"], ["Risks", analysis.swot.threats, "is-risk"]].map(([title, items, className]) => <div className={`vp-swot-card ${className}`} key={title}><span className="vp-eyebrow">{title}</span><ul>{items.length ? items.map((item) => <li key={item}>{item}</li>) : <li>Complete more matrices to surface a traceable signal.</li>}</ul></div>)}</section><button className="vp-primary-button" onClick={persist}>{saved ? "Analysis saved ✓" : "Save analysis →"}</button></div>;
}
