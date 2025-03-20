// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM31tBW9fSgUZtsm278Ixv1pYy_e7D0rs",
  authDomain: "the-coding-crusaders.firebaseapp.com",
  projectId: "the-coding-crusaders",
  storageBucket: "the-coding-crusaders.appspot.com", // 🔥 Fixed Here
  messagingSenderId: "609634794510",
  appId: "1:609634794510:web:9c2dfb6ec2abc41c1c505f",
  measurementId: "G-JJ7TRWVRC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore Setup
const googleProvider = new GoogleAuthProvider(); 

export { auth, app, db, googleProvider, RecaptchaVerifier };
