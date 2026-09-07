import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { normalizeStartup } from "../utils/dataNormalization";

export default function IdeaDetails() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getDoc(doc(db, "ideas", id)).then((docSnap) => {
      if (active && docSnap.exists()) setIdea(normalizeStartup({ id, ...docSnap.data() }));
      if (active && !docSnap.exists()) setError("This startup could not be found.");
    }).catch(() => setError("We could not load this startup."));
    return () => {
      active = false;
    };
  }, [id]);

  if (error) return <div className="vp-empty-state"><h1>{error}</h1><button className="vp-primary-button" onClick={() => navigate("/my-ideas")}>Back to ideas</button></div>;
  if (!idea) return <div className="vp-loading-state">Opening startup details...</div>;

  const cards = [["Problem", idea.problem?.problem || idea.discovery?.problem?.answers?.problem_description, "is-yellow"], ["Customer", idea.problem?.affectedUsers || idea.discovery?.customer?.answers?.primary_customer, "is-red"], ["Solution", idea.solution?.solution || idea.discovery?.solution?.answers?.solution_description, "is-yellow"], ["Market", idea.market?.targetAudience || idea.discovery?.market?.answers?.first_users, "is-red"], ["Business", idea.business?.revenueModel || idea.discovery?.business?.answers?.business_model, "is-red"]];
  return <div className="vp-detail-page"><button className="vp-back-link vp-button-link" onClick={() => navigate("/my-ideas")}>← Back to ideas</button><div className="vp-detail-heading"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Startup record</div><h1>{idea.basics?.rawIdea || idea.basics?.title || idea.title || "Untitled startup"}</h1><p>{idea.basics?.domain || "Discovery journey"} <span>·</span> {idea.workflow?.currentStage || idea.status || "Draft"}</p></div><div className="vp-detail-score"><span>Readiness</span><strong>{idea.scores?.overallReadiness || 0}<small>/100</small></strong></div></div><div className="vp-detail-actions"><button className="vp-primary-button" onClick={() => navigate(`/discover/${id}/canvas`)}>Open discovery canvas →</button><button className="vp-secondary-button" onClick={() => navigate(`/vp-one/${id}`)}>Challenge with VP-One</button></div><div className="vp-detail-grid">{cards.map(([title, value, tone]) => <section className={`vp-detail-card ${tone}`} key={title}><span className="vp-eyebrow">{title}</span><p>{value || "Not explored yet"}</p></section>)}</div><section className="vp-detail-summary"><div><span className="vp-eyebrow">Evidence confidence</span><strong>{idea.scores?.evidenceConfidence || 0}%</strong></div><div><span className="vp-eyebrow">Current focus</span><strong>{idea.workflow?.currentMatrix || "Problem discovery"}</strong></div><div><span className="vp-eyebrow">Assumptions tracked</span><strong>{idea.assumptions?.length || 0}</strong></div></section></div>;
}