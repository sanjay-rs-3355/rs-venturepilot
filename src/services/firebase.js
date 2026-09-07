// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getAI } from "firebase/ai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-xIkfvxBO8C2GXxDSdbzQiKMxilqMb3M",
  authDomain: "rs-venturepilot.firebaseapp.com",
  projectId: "rs-venturepilot",
  storageBucket: "rs-venturepilot.firebasestorage.app",
  messagingSenderId: "763572534625",
  appId: "1:763572534625:web:3ff0837812c49f5b381920",
  measurementId: "G-5NSLBX6S4G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const ai = getAI(app);

export default app;