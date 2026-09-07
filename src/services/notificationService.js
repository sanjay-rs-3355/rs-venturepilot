import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function addNotification(
  title,
  message,
  type = "info"
) {

  await addDoc(collection(db, "notifications"), {
    userId: auth.currentUser.uid,
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

}

export async function getNotifications() {

  if (!auth.currentUser) return [];

  const q = query(
    collection(db, "notifications"),
    where("userId", "==", auth.currentUser.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

}

export async function getUnreadNotificationCount() {
  if (!auth.currentUser) return 0;

  const notifications = await getNotifications();
  return notifications.filter((notification) => !notification.isRead).length;
}