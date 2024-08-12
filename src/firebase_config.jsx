import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD_qwGJ0Ya4IWLuv0Rx6rclbcirS5HIBI4",
  authDomain: "codequest-728e4.firebaseapp.com",
  projectId: "codequest-728e4",
  storageBucket: "codequest-728e4.appspot.com",
  messagingSenderId: "3001560130",
  appId: "1:3001560130:web:8e8e34c2787eed353711db",
  measurementId: "G-YS2H2L0KLP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
