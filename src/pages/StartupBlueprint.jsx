import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStartup } from "../services/startupService";
import { normalizeStartup } from "../utils/dataNormalization";

function BlueprintItem({ label, value }) { return <div className="vp-blueprint-item"><span className="vp-eyebrow">{label}</span><p>{value || "Not discovered yet"}</p></div>; }

export default function StartupBlueprint() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  useEffect(() => { getStartup(id).then((data) => setStartup(normalizeStartup(data))); }, [id]);
  if (!startup) return <div className="vp-loading-state">Assembling your startup blueprint...</div>;
  const discovery = startup.discovery || {};
  const answers = (key) => Object.values(discovery[key]?.answers || {}).filter((value) => typeof value === "string" && value.length > 12).join(" ");
  const statement = startup.refinements?.[startup.refinements.length - 1]?.statement || startup.basics.rawIdea;
  return <div className="vp-blueprint-page"><div className="vp-page-heading-row"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Startup blueprint</div><h1>The clearer version.</h1><p>A living summary of the decisions, evidence, assumptions, and next moves in your journey.</p></div><Link className="vp-secondary-button" to={`/discover/${id}/analysis`}>Back to analysis →</Link></div><section className="vp-blueprint-cover"><span className="vp-eyebrow">Refined startup statement</span><h2>{statement}</h2><div><span>Readiness</span><strong>{startup.scores?.overallReadiness || 0}/100</strong><span>Evidence</span><strong>{startup.scores?.evidenceConfidence || 0}%</strong></div></section><section className="vp-blueprint-grid"><BlueprintItem label="Problem" value={answers("problem")} /><BlueprintItem label="Target customer" value={answers("customer")} /><BlueprintItem label="Solution" value={answers("solution")} /><BlueprintItem label="Market and reach" value={answers("market")} /><BlueprintItem label="Differentiation" value={answers("competition")} /><BlueprintItem label="Business model" value={answers("business")} /></section><section className="vp-blueprint-bottom"><div><span className="vp-eyebrow">Open assumptions</span><ul>{(startup.assumptions || []).slice(0, 5).map((item) => <li key={item.id}>{item.statement}</li>)}</ul></div><div><span className="vp-eyebrow">Recommended next step</span><h2>Run the next validation mission.</h2><p>Your blueprint becomes stronger when an assumption changes status because of evidence.</p><Link className="vp-text-link" to={`/discover/${id}/validate`}>Open validation plan →</Link></div></section></div>;
}
