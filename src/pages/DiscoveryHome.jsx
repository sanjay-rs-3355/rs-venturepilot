import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../services/dashboardService";
import { createRawIdea } from "../services/startupService";

export default function DiscoveryHome() {
  const navigate = useNavigate();
  const [rawIdea, setRawIdea] = useState("");
  const [recentIdea, setRecentIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        const latest = data.startups
          .filter((startup) => startup.workflow || startup.basics?.rawIdea)
          .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))[0];
        setRecentIdea(latest || null);
      })
      .catch(() => setError("We could not load your previous journeys."))
      .finally(() => setPageLoading(false));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rawIdea.trim().length < 12) {
      setError("Give VP-One a little more to work with, in one or two sentences.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const idea = await createRawIdea(rawIdea.trim());
      navigate(`/discover/${idea.id}/canvas`);
    } catch (submitError) {
      setError(submitError.message || "Your idea could not be saved.");
      setLoading(false);
    }
  };

  return (
    <div className="vp-discovery-home">
      <div className="vp-page-kicker"><span className="vp-kicker-dot" /> New discovery journey</div>
      <div className="vp-discovery-welcome"><span className="vp-welcome-spark">✦</span><span><strong>No perfect pitch needed.</strong> Bring the half-formed version. That is where the interesting work starts.</span></div>
      <div className="vp-hero-grid">
        <section className="vp-hero-copy">
          <h1>Turn the spark into something <em>real.</em></h1>
          <p className="vp-hero-lede">Start with the rough version. VP-One will help you find the sharpest problem, the right people, and the questions that matter next.</p>
          <form onSubmit={handleSubmit} className="vp-raw-idea-form">
            <label htmlFor="raw-idea">What's your startup idea?</label>
            <textarea id="raw-idea" value={rawIdea} onChange={(event) => setRawIdea(event.target.value)} placeholder="I want to build an AI platform that helps college students find internships..." rows="6" />
            <div className="vp-form-footer">
              <span>{rawIdea.length > 0 ? `${rawIdea.length} characters` : "No pitch deck required"}</span>
              <button className="vp-primary-button" type="submit" disabled={loading}>{loading ? "Starting..." : "Start discovering →"}</button>
            </div>
            <div className="vp-idea-prompt-row"><span>Try starting with</span><button type="button" onClick={() => setRawIdea("I want to help...")}>“I want to help...”</button><button type="button" onClick={() => setRawIdea("People struggle with...")}>“People struggle with...”</button></div>
          </form>
          {error && <p className="vp-error-message">{error}</p>}
        </section>

        <aside className="vp-mentor-intro">
          <div className="vp-orbit vp-orbit-one" /><div className="vp-orbit vp-orbit-two" />
          <div className="vp-mentor-face">VP<span>01</span></div>
          <span className="vp-mentor-label">Your thinking partner</span>
          <h2>Meet VP-One</h2>
          <p>Friendly when you need momentum. Honest when an assumption needs testing.</p>
          <div className="vp-mentor-quote">“Interesting is a start. Let’s make it specific.”</div>
        </aside>
      </div>

      {!pageLoading && recentIdea && (
        <section className="vp-continue-strip">
          <div><span className="vp-eyebrow">Pick up where you left off</span><h2>{recentIdea.basics?.rawIdea || recentIdea.basics?.title || "Your startup journey"}</h2><p>Last active in {recentIdea.workflow?.currentStage || "understand"}</p></div>
          <button className="vp-secondary-button" onClick={() => navigate(`/discover/${recentIdea.id}/canvas`)}>Continue journey →</button>
        </section>
      )}

      <section className="vp-process-row">
        <div><span>01</span><strong>Understand</strong><p>Make the raw idea visible.</p></div>
        <div><span>02</span><strong>Discover</strong><p>Explore the unknowns.</p></div>
        <div><span>03</span><strong>Refine</strong><p>Leave with a clearer bet.</p></div>
      </section>
    </div>
  );
}
