import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function getDashboardData() {

 if (!auth.currentUser) {
  return {
    startups: [],
    total: 0,
    drafts: 0,
    submitted: 0,
    approved: 0,
  };
}

const q = query(
  collection(db, "ideas"),
  where("studentId", "==", auth.currentUser.uid)
);

  const snapshot = await getDocs(q);

  const startups = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    startups,
    total: startups.length,

    drafts: startups.filter(
      s => s.status === "draft"
    ).length,

    submitted: startups.filter(
      s => s.status === "submitted"
    ).length,

    approved: startups.filter(
      s => s.status === "approved"
    ).length,
  };
}