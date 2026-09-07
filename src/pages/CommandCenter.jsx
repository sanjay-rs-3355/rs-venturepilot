import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export default function CommandCenter() {
  const [ideas, setIdeas] = useState([]);
  useEffect(() => { getDocs(collection(db, "ideas")).then((snapshot) => setIdeas(snapshot.docs.map((item) => item.data()))); }, []);
  const count = (predicate) => ideas.filter(predicate).length;
  return <div className="min-h-screen bg-slate-950 text-white p-8"><p className="text-emerald-400 text-xs uppercase tracking-[.2em]">Platform overview</p><h1 className="text-5xl font-serif mt-4 mb-3">Command center.</h1><p className="text-slate-400 mb-10">A high-level view of the VenturePilot pipeline.</p><div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">{[["Total ideas", ideas.length], ["In discovery", count((idea) => idea.status === "draft")], ["Submitted", count((idea) => idea.status === "submitted")], ["Incubating", count((idea) => idea.incubationStatus === "accepted")]].map(([label, value]) => <div className="bg-slate-900 border border-slate-800 p-6" key={label}><span className="text-slate-400 text-xs uppercase">{label}</span><strong className="block text-4xl mt-5">{value}</strong></div>)}</div></div>;
}