import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStartup } from "../services/startupService";
import { saveMatrixAnswers } from "../services/discoveryService";
import { normalizeStartup } from "../utils/dataNormalization";
import MatrixQuestionRenderer from "../components/matrix/MatrixQuestionRenderer";
import { matrixQuestions, matrixOrder } from "../data/matrixQuestions";

export default function DiscoveryMatrix() {
  const { id, matrixId } = useParams();
  const navigate = useNavigate();
  const content = matrixQuestions[matrixId] || matrixQuestions.problem;
  const [startup, setStartup] = useState(null);
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;
    getStartup(id).then((data) => {
      const normalized = normalizeStartup(data);
      setStartup(normalized);
      setAnswers(normalized?.discovery?.[matrixId]?.answers || {});
    }).finally(() => setLoading(false));
  }, [id, matrixId]);

  const saveAnswers = async () => {
    if (!id) return;
    setSaving(true);
    const result = await saveMatrixAnswers(id, matrixId, content.questions, answers, startup?.discovery || {});
    setStartup((current) => ({ ...current, discovery: result.discovery, scores: result.scores, workflow: result.workflow }));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const answeredRequired = content.questions.filter((question) => question.required).every((question) => answers[question.id]);
  const matrixIndex = matrixOrder.indexOf(matrixId);

  if (!id) return <div className="vp-empty-state"><h1>Choose an idea first.</h1><p>Open a discovery journey to explore this matrix.</p><Link className="vp-primary-button" to="/discover">Start discovering</Link></div>;
  if (loading) return <div className="vp-loading-state">Loading matrix...</div>;

  return <div className="vp-matrix-page"><Link className="vp-back-link" to={`/discover/${id}/canvas`}>← Back to canvas</Link><div className="vp-matrix-heading"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> {content.eyebrow}</div><h1>{content.title}</h1><p>{content.purpose}</p></div><div className="vp-matrix-progress"><span>Journey progress</span><strong>{startup?.workflow?.progress || 0}%</strong><div><i style={{ width: `${startup?.workflow?.progress || 0}%` }} /></div></div></div><section className="vp-question-panel vp-question-stack">{content.questions.map((question, index) => <div className="vp-matrix-question" key={question.id}><div className="vp-question-number">{String(index + 1).padStart(2, "0")}</div><h2>{question.label}{question.required && <sup>*</sup>}</h2><MatrixQuestionRenderer question={question} value={answers[question.id]} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} /></div>)}<div className="vp-question-footer"><span className="vp-assumption-tag">◐ Answers begin as assumptions until evidence changes their status</span><button className="vp-primary-button" onClick={saveAnswers} disabled={!answeredRequired || saving}>{saved ? "Saved ✓" : saving ? "Saving..." : "Save matrix →"}</button></div></section><div className="vp-matrix-nav"><button className="vp-secondary-button" disabled={matrixIndex <= 0} onClick={() => navigate(`/discover/${id}/matrix/${matrixOrder[matrixIndex - 1]}`)}>← Previous</button><button className="vp-secondary-button" disabled={matrixIndex === matrixOrder.length - 1} onClick={() => navigate(`/discover/${id}/matrix/${matrixOrder[matrixIndex + 1]}`)}>Next matrix →</button></div><div className="vp-matrix-note"><span className="vp-mentor-mini">VP</span><p>Idea quality and evidence confidence are different signals. The goal is not to sound certain; it is to learn what is true.</p></div></div>;
}
