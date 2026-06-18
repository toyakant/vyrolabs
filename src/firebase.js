import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyzum3B287r8WYUQE04J8nmHjwkadTEjA",
  authDomain: "vyrolabs-journal.firebaseapp.com",
  projectId: "vyrolabs-journal",
  storageBucket: "vyrolabs-journal.firebasestorage.app",
  messagingSenderId: "714952667533",
  appId: "1:714952667533:web:36e01b4e6450266860cdc4",
  measurementId: "G-4XPB3PM639"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//const analytics = getAnalytics(app);

export default app;