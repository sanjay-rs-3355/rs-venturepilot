import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStartup } from "../services/startupService";
import { normalizeStartup } from "../utils/dataNormalization";
import { buildAnalysis } from "../services/analysisService";

export default function ValidationPlan() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [missions, setMissions] = useState([]);
  useEffect(() => { getStartup(id).then((data) => { const normalized = normalizeStartup(data); setStartup(normalized); setMissions(normalized.validation?.missions?.length ? normalized.validation.missions : buildAnalysis(normalized).missions); }); }, [id]);
  if (!startup) return <div className="vp-loading-state">Preparing your validation missions...</div>;
  const toggleMission = async (mission) => { const updated = missions.map((item) => item.id === mission.id ? { ...item, complete: !item.complete } : item); setMissions(updated); await updateDoc(doc(db, "ideas", id), { "validation.missions": updated, updatedAt: new Date().toISOString() }); };
  return <div className="vp-validation-page"><div className="vp-page-heading-row"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Validate</div><h1>Replace guesses with signals.</h1><p>These missions are generated from what is still uncertain in your discovery work.</p></div><Link className="vp-secondary-button" to={`/discover/${id}/analysis`}>See analysis →</Link></div><div className="vp-mission-list">{missions.map((mission, index) => <article className={`vp-validation-mission ${mission.complete ? "is-complete" : ""}`} key={mission.id}><div className="vp-mission-number">0{index + 1}</div><div className="vp-mission-body"><div className="vp-mission-title-row"><h2>{mission.title}</h2><button className="vp-check-button" onClick={() => toggleMission(mission)} aria-label={mission.complete ? "Mark mission incomplete" : "Mark mission complete"}>{mission.complete ? "✓" : "○"}</button></div><p>{mission.why}</p><div className="vp-mission-details"><div><span>Method</span><strong>{mission.method}</strong></div><div><span>Success looks like</span><strong>{mission.success}</strong></div></div></div></article>)}</div></div>;
}
