import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStartup } from "../services/startupService";
import { normalizeStartup } from "../utils/dataNormalization";

export default function RefinementPage() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [statement, setStatement] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => { getStartup(id).then((data) => { const normalized = normalizeStartup(data); setStartup(normalized); setStatement(normalized?.refinements?.at(-1)?.statement || normalized?.basics?.rawIdea || ""); }); }, [id]);
  if (!startup) return <div className="vp-loading-state">Opening your refinement history...</div>;
  const saveRefinement = async () => { if (!statement.trim()) return; const version = (startup.refinements?.length || 0) + 1; const refinement = { version, label: "Founder refinement", statement: statement.trim(), changedBecause: "Founder updated the idea after discovery work.", createdAt: new Date().toISOString() }; await updateDoc(doc(db, "ideas", id), { refinements: arrayUnion(refinement), "basics.elevatorPitch": statement.trim(), updatedAt: new Date().toISOString() }); setStartup((current) => ({ ...current, refinements: [...(current.refinements || []), refinement] })); setSaved(true); setTimeout(() => setSaved(false), 1600); };
  return <div className="vp-refinement-page"><div className="vp-page-heading-row"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> Refine</div><h1>Watch the idea get sharper.</h1><p>Keep meaningful changes. The evolution is part of the evidence.</p></div><Link className="vp-secondary-button" to={`/discover/${id}/canvas`}>Back to canvas →</Link></div><section className="vp-refine-editor"><span className="vp-eyebrow">Version {(startup.refinements?.length || 0) + 1}</span><h2>What is the clearest version of the idea now?</h2><textarea value={statement} onChange={(event) => setStatement(event.target.value)} rows="5" /><div className="vp-question-footer"><span className="vp-assumption-tag">This becomes the next version in your history.</span><button className="vp-primary-button" onClick={saveRefinement}>{saved ? "Version saved ✓" : "Save refinement →"}</button></div></section><section className="vp-history-list"><div className="vp-section-title"><div><span className="vp-eyebrow">Idea history</span><h2>Before → after</h2></div></div>{[...(startup.refinements || [])].reverse().map((version, index) => <article className="vp-history-item" key={`${version.version}-${version.createdAt}`}><span>V{version.version}</span><div><strong>{version.label}</strong><p>{version.statement}</p>{index < (startup.refinements || []).length - 1 && <small>Changed as discovery added clarity.</small>}</div></article>)}</section></div>;
}
