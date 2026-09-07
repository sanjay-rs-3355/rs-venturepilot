import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStartup } from "../services/startupService";
import { normalizeStartup } from "../utils/dataNormalization";

const areas = [
  ["problem", "Problem", "Is this a meaningful problem?", "yellow"],
  ["customer", "Target user", "Who feels this most sharply?", "red"],
  ["solution", "Solution", "What are you helping them do?", "yellow"],
  ["value", "Value proposition", "Why will this be better?", "red"],
  ["market", "Market", "How large and reachable is it?", "red"],
  ["competition", "Differentiation", "Why you instead of the default?", "red"],
  ["business", "Business model", "How could this become viable?", "red"],
];

export default function IdeaCanvas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStartup(id).then((data) => setStartup(normalizeStartup(data))).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="vp-loading-state">Opening your canvas...</div>;
  if (!startup) return <div className="vp-empty-state"><h1>That journey is not available.</h1><Link to="/discover">Start a new one</Link></div>;

  const rawIdea = startup.basics.rawIdea || startup.basics.title;

  return (
    <div className="vp-canvas-page">
      <div className="vp-page-heading-row"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Understand</div><h1>Your idea, in focus.</h1><p>VP-One has read the first version. Here’s what is clear, and what deserves your attention next.</p></div><span className="vp-stage-pill">01 / 08</span></div>
      <section className="vp-understood-card"><div className="vp-card-label">VP-ONE UNDERSTOOD</div><p>“{rawIdea}”</p><div className="vp-understood-note"><span className="vp-mentor-mini">VP</span><span>The direction is interesting, but three important assumptions are still hiding inside it.</span></div></section>
      <div className="vp-canvas-layout"><section><div className="vp-section-title"><div><span className="vp-eyebrow">Living idea canvas</span><h2>What we know so far</h2></div><span className="vp-confidence">{startup.scores?.evidenceConfidence || 0}% evidence confidence</span></div><div className="vp-canvas-grid">{areas.map(([key, label, prompt, state]) => <button key={key} className={`vp-canvas-card is-${state}`} onClick={() => navigate(`/discover/${id}/matrix/${key}`)}><div className="vp-canvas-card-top"><span className="vp-status-dot" /><span>{state === "yellow" ? "Needs exploration" : "Unclear"}</span></div><h3>{label}</h3><p>{prompt}</p><span className="vp-explore-link">Explore <span>↗</span></span></button>)}</div></section><aside className="vp-next-mission"><span className="vp-eyebrow">VP-ONE SUGGESTS</span><h2>Start with the problem.</h2><p>Before polishing the solution, let’s find out whether this is painful, frequent, and specific enough to build around.</p><button className="vp-primary-button" onClick={() => navigate(`/discover/${id}/matrix/problem`)}>Explore problem →</button><div className="vp-mission-meta"><span>Estimated time</span><strong>8 min</strong></div></aside></div><div className="vp-canvas-actions"><Link className="vp-text-link" to={`/discover/${id}/refine`}>Refine idea ↗</Link><Link className="vp-text-link" to={`/discover/${id}/validate`}>Validation plan ↗</Link><Link className="vp-text-link" to={`/discover/${id}/analysis`}>Readiness analysis ↗</Link><Link className="vp-text-link" to={`/discover/${id}/blueprint`}>Startup blueprint ↗</Link><Link className="vp-text-link" to={`/vp-one/${id}`}>Challenge with VP-One ↗</Link></div>
    </div>
  );
}
