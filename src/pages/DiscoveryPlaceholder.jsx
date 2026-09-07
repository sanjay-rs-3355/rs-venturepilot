import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDashboardData } from "../services/dashboardService";
import { normalizeStartup } from "../utils/dataNormalization";

const labels = { problem: "Problem", customer: "Customer", solution: "Solution", market: "Market", competition: "Competition", business: "Business", feasibility: "Feasibility", risk: "Risk", refine: "Refine", validate: "Validation plan", analysis: "Analysis", blueprint: "Startup blueprint", "vp-one": "VP-One" };
const matrixSections = new Set(["problem", "customer", "solution", "market", "competition", "business", "feasibility", "risk"]);

function getDestination(startupId, section) {
  return matrixSections.has(section) ? `/discover/${startupId}/matrix/${section}` : `/discover/${startupId}/${section}`;
}

export default function DiscoveryPlaceholder() {
  const { id, section } = useParams();
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  useEffect(() => { if (!id) getDashboardData().then((data) => setIdeas(data.startups.map(normalizeStartup))); }, [id]);
  const label = labels[section] || "Next stage";
  if (id && matrixSections.has(section)) return <div className="vp-empty-state vp-placeholder-state"><div className="vp-page-kicker"><span className="vp-kicker-dot" /> {label}</div><h1>Open this matrix from your idea.</h1><p>We found the requested workspace. Continue directly into the structured questions.</p><Link className="vp-primary-button" to={getDestination(id, section)}>Open {label} →</Link></div>;
  if (id) return <div className="vp-empty-state vp-placeholder-state"><div className="vp-page-kicker"><span className="vp-kicker-dot" /> {label}</div><h1>This workspace is not available for that route.</h1><p>Return to the idea canvas to continue your startup journey.</p><Link className="vp-primary-button" to={`/discover/${id}/canvas`}>Return to canvas →</Link></div>;
  return <div className="vp-selector-page"><div className="vp-page-kicker"><span className="vp-kicker-dot" /> {label}</div><h1>Choose an idea to continue.</h1><p>Discovery work belongs to a specific startup. Select one below and we’ll open the {label.toLowerCase()} workspace.</p><div className="vp-selector-list">{ideas.length ? ideas.map((idea) => <button className="vp-selector-card" key={idea.id} onClick={() => navigate(getDestination(idea.id, section))}><span className="vp-startup-index">{idea.scores?.overallReadiness || 0}</span><span><strong>{idea.basics?.rawIdea || idea.basics?.title || "Untitled startup"}</strong><small>{idea.workflow?.currentStage || "Understand"} · evidence {idea.scores?.evidenceConfidence || 0}%</small></span><span>↗</span></button>) : <div className="vp-empty-startup"><span className="vp-mentor-mini">VP</span><div><h2>No startup journeys yet.</h2><p>Start with a raw idea and this workspace will be waiting for it.</p></div><Link className="vp-primary-button" to="/discover">Start discovering →</Link></div>}</div></div>;
}
