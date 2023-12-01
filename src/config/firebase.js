// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmG-2iWryTy8D-5qnYT1-rJmmTh898CJE",
  authDomain: "social-media-project-26611.firebaseapp.com",
  projectId: "social-media-project-26611",
  storageBucket: "social-media-project-26611.appspot.com",
  messagingSenderId: "926754430227",
  appId: "1:926754430227:web:87dbc20318f64fef228ee6",
  measurementId: "G-CKMWM60TE9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
