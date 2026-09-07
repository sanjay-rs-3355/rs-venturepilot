import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getCurrentUser() {

  if (!auth.currentUser) return null;

  const docRef = doc(db, "users", auth.currentUser.uid);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}