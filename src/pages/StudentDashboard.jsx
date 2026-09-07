import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDashboardData } from "../services/dashboardService";

const stageLabels = { understand: "Understand", discover: "Discover", refine: "Refine", validate: "Validate" };

export default function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      getDashboardData().then(setDashboard).catch(() => setError("We could not load your dashboard."));
    });
    return unsubscribe;
  }, []);

  if (error) return <div className="vp-empty-state"><h1>{error}</h1><Link className="vp-primary-button" to="/discover">Start a new journey</Link></div>;
  if (!dashboard) return <div className="vp-loading-state">Preparing your workspace...</div>;

  const latest = dashboard.startups[0];

  return <div className="vp-dashboard-page"><div className="vp-dashboard-heading"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Student workspace</div><h1>Welcome back<span>.</span></h1><p>Your next useful question is closer than you think.</p></div><Link className="vp-primary-button" to="/discover">+ New startup</Link></div><div className="vp-dashboard-stats"><div><span>My ideas</span><strong>{dashboard.total}</strong></div><div><span>In progress</span><strong>{dashboard.drafts}</strong></div><div><span>Validated</span><strong>{dashboard.approved}</strong></div><div className="is-highlight"><span>Evidence confidence</span><strong>{latest?.scores?.evidenceConfidence || 0}<small>%</small></strong></div></div>{latest ? <section className="vp-current-startup"><div><span className="vp-eyebrow">Continue your latest journey</span><h2>{latest.basics?.rawIdea || latest.basics?.title || "Untitled startup"}</h2><p>{stageLabels[latest.workflow?.currentStage] || "Understand"} <span>·</span> Readiness {latest.scores?.overallReadiness || 0}%</p></div><Link className="vp-secondary-button" to={`/discover/${latest.id}/canvas`}>Open canvas →</Link></section> : <section className="vp-empty-startup"><span className="vp-mentor-mini">VP</span><div><h2>Your first idea deserves a little room.</h2><p>Start with a rough thought. We’ll turn it into a sharper question together.</p></div><Link className="vp-primary-button" to="/discover">Start discovering →</Link></section>}<div className="vp-dashboard-lower"><section><div className="vp-section-title"><div><span className="vp-eyebrow">Recent startups</span><h2>Keep the momentum</h2></div><Link className="vp-text-link" to="/my-ideas">View all →</Link></div>{dashboard.startups.slice(0, 3).map((startup) => <Link className="vp-startup-row" key={startup.id} to={startup.workflow ? `/discover/${startup.id}/canvas` : `/idea/${startup.id}`}><span className="vp-startup-index">0{dashboard.startups.indexOf(startup) + 1}</span><span className="vp-startup-name">{startup.basics?.rawIdea || startup.basics?.title || startup.title || "Untitled startup"}</span><span className="vp-startup-stage">{stageLabels[startup.workflow?.currentStage] || startup.status || "Draft"}</span><span className="vp-startup-arrow">↗</span></Link>)}</section><aside className="vp-dashboard-mission"><span className="vp-eyebrow">Recommended next mission</span><h2>Talk to five people who live with the problem.</h2><p>Evidence compounds faster than assumptions. Your next conversation can change the shape of the idea.</p><Link className="vp-text-link" to="/discover/validate">See validation plan →</Link></aside></div></div>;
}