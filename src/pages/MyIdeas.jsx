import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { normalizeStartup } from "../utils/dataNormalization";
export default function MyIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;
    let active = true;
    const fetchIdeas = async () => {
      const q = query(
        collection(db, "ideas"),
        where(
          "studentId",
          "==",
          auth.currentUser.uid
        )
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (active) setIdeas(data.map(normalizeStartup));
    };
    fetchIdeas().catch(() => setError("We could not load your ideas right now.")).finally(() => setLoading(false));
    return () => {
      active = false;
    }
  }, []);

  if (loading) return <div className="vp-loading-state">Gathering your startup ideas...</div>;
  return <div className="vp-ideas-page"><div className="vp-page-heading-row"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Your portfolio</div><h1>Ideas worth exploring.</h1><p>Every idea has a next question. Keep the strongest ones moving.</p></div><button className="vp-primary-button" onClick={() => navigate("/discover")}>+ New startup</button></div>{error && <p className="vp-error-message">{error}</p>}{ideas.length === 0 ? <section className="vp-empty-startup"><span className="vp-mentor-mini">VP</span><div><h2>Your idea vault is waiting.</h2><p>Start with a rough thought and build evidence around it.</p></div><button className="vp-primary-button" onClick={() => navigate("/discover")}>Start discovering →</button></section> : <div className="vp-ideas-list">{ideas.map((idea, index) => <article className="vp-idea-row" key={idea.id} onClick={() => navigate(idea.workflow ? `/discover/${idea.id}/canvas` : `/idea/${idea.id}`)}><span className="vp-startup-index">{String(index + 1).padStart(2, "0")}</span><div className="vp-idea-main"><h2>{idea.basics?.rawIdea || idea.basics?.title || idea.title || "Untitled startup"}</h2><p>{idea.basics?.domain || "Discovery journey"}</p></div><div className="vp-idea-metric"><span>Readiness</span><strong>{idea.scores?.overallReadiness || 0}</strong></div><div className="vp-idea-metric"><span>Evidence</span><strong>{idea.scores?.evidenceConfidence || 0}%</strong></div><span className="vp-startup-stage">{idea.workflow?.currentStage || idea.status || "Draft"}</span><span className="vp-startup-arrow">↗</span></article>)}</div>}</div>;
}