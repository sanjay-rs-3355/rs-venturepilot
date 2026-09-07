import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../services/firebase";

export default function VendorPortal() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDocs(query(collection(db, "ideas"), where("incubationStatus", "in", ["shortlisted", "accepted"])))
      .then((snapshot) => setIdeas(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))))
      .catch(() => setError("We could not load the partner pipeline."))
      .finally(() => setLoading(false));
  }, []);

  const updatePartnerStatus = async (id, partnerStatus) => {
    await updateDoc(doc(db, "ideas", id), { partnerStatus, updatedAt: new Date().toISOString() });
    setIdeas((current) => current.map((idea) => idea.id === id ? { ...idea, partnerStatus } : idea));
  };

  if (loading) return <div className="vp-role-page"><div className="vp-role-loading">Loading partner pipeline...</div></div>;

  return <div className="vp-role-page"><header className="vp-role-header"><div><span className="vp-role-kicker">VenturePilot partners</span><h1>Help the next idea move.</h1><p>Review incubating ventures and connect them with the right resources, pilots, and expertise.</p></div><div className="vp-role-mark">↗</div></header><div className="vp-role-stats"><div><span>Partner-ready</span><strong>{ideas.length}</strong></div><div><span>In conversation</span><strong>{ideas.filter((idea) => idea.partnerStatus === "contacted").length}</strong></div><div><span>Activated</span><strong>{ideas.filter((idea) => idea.partnerStatus === "active").length}</strong></div></div>{error && <p className="vp-role-error">{error}</p>}<section className="vp-role-section"><div className="vp-role-section-heading"><div><span className="vp-role-kicker">Opportunity queue</span><h2>Ventures needing a partner</h2></div><span className="vp-role-count">{ideas.length} ventures</span></div>{ideas.length ? <div className="vp-partner-list">{ideas.map((idea) => <article className="vp-partner-card" key={idea.id}><div className="vp-partner-card-main"><span className="vp-partner-score">{idea.scores?.overallReadiness || 0}</span><div><span className="vp-partner-stage">{idea.incubationStatus || "shortlisted"}</span><h3>{idea.basics?.rawIdea || idea.basics?.title || "Untitled startup"}</h3><p>Evidence confidence: {idea.scores?.evidenceConfidence || 0}% · Focus: {idea.workflow?.currentMatrix || "Discovery"}</p></div></div><select value={idea.partnerStatus || "new"} onChange={(event) => updatePartnerStatus(idea.id, event.target.value)} aria-label={`Partner status for ${idea.basics?.title || "startup"}`}><option value="new">New opportunity</option><option value="contacted">Contacted</option><option value="active">Partner activated</option><option value="declined">Not a fit</option></select></article>)}</div> : <div className="vp-role-empty"><h3>No partner opportunities yet.</h3><p>Mentor-approved and shortlisted ventures will appear here.</p></div>}</section></div>;
}
