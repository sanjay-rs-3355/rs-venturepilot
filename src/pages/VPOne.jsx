import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getStartup } from "../services/startupService";
import { normalizeStartup } from "../utils/dataNormalization";

const modes = ["Founder", "Mentor", "Investor", "Research"];
const challengePrompts = ["Why would customers choose you instead of their current workaround?", "What evidence supports your riskiest assumption?", "What happens if a competitor copies your most visible feature?", "Which feature could you remove from the first version?", "Why would someone pay, switch, or make time for this?"];

function mentorReply(text, startup) {
  const lower = text.toLowerCase();
  if (lower.includes("pay") || lower.includes("price")) return "That is a business assumption, not a fact yet. What is the smallest real commitment you can ask for this week?";
  if (lower.includes("compet")) return "Your differentiation needs a specific axis. Is it speed, access, trust, workflow, or distribution? Pick one you can demonstrate.";
  if (lower.includes("evidence") || lower.includes("proof")) return `Your current evidence confidence is ${startup?.scores?.evidenceConfidence || 0}%. Let’s increase it with one observable behavior, not another opinion.`;
  return "That is a useful direction. Make it testable: who would behave differently, in what situation, and what result would change your mind?";
}

export default function VPOne() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [mode, setMode] = useState("Founder");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => { if (id) getStartup(id).then((data) => setStartup(normalizeStartup(data))); }, [id]);
  const send = async (text = input) => { if (!text.trim()) return; const reply = mentorReply(text, startup); setMessages((current) => [...current, { role: "student", text: text.trim() }, { role: "vp", text: reply }]); setInput(""); if (id) await updateDoc(doc(db, "ideas", id), { "workflow.currentStage": "challenge", updatedAt: new Date().toISOString() }); };
  return <div className="vp-vpone-page"><div className="vp-vpone-heading"><div><div className="vp-page-kicker"><span className="vp-kicker-dot" /> VP-One mentor room</div><h1>Let’s pressure-test the idea.</h1><p>Supportive does not mean agreeable. Choose a lens and ask the question you are avoiding.</p></div>{id && <Link className="vp-secondary-button" to={`/discover/${id}/canvas`}>Back to canvas →</Link>}</div><div className="vp-mode-tabs">{modes.map((item) => <button className={mode === item ? "is-active" : ""} key={item} onClick={() => setMode(item)}>{item} mode</button>)}</div><section className="vp-vpone-layout"><aside className="vp-challenge-list"><span className="vp-eyebrow">{mode} challenges</span>{challengePrompts.map((prompt) => <button key={prompt} onClick={() => send(prompt)}>{prompt}<span>↗</span></button>)}</aside><section className="vp-chat-panel"><div className="vp-chat-header"><span className="vp-mentor-mini">VP</span><div><strong>VP-One</strong><span>Constructive pressure, useful next steps</span></div></div><div className="vp-message-list">{messages.length === 0 ? <div className="vp-chat-empty"><h2>Start with the hard question.</h2><p>Use a challenge on the left, or tell VP-One what you are currently unsure about.</p></div> : messages.map((message, index) => <div className={`vp-chat-message ${message.role === "vp" ? "is-vp" : "is-student"}`} key={`${message.role}-${index}`}>{message.text}</div>)}</div><div className="vp-chat-input"><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Ask VP-One something specific..." /><button className="vp-primary-button" onClick={() => send()}>Send →</button></div></section></section></div>;
}
