// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmgU2k5TvMvPNlbGz0qCAkBYM_cgbWZtg",
  authDomain: "student-management-porta-37ddb.firebaseapp.com",
  projectId: "student-management-porta-37ddb",
  storageBucket: "student-management-porta-37ddb.appspot.com",
  messagingSenderId: "120730272030",
  appId: "1:120730272030:web:8d18d59122f4f239b1490f",
  measurementId: "G-XW19BHN74X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore }