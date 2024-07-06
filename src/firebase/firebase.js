import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaYckGLjp_HQEgIW8-xzrSjHvM3ge3LDE",
  authDomain: "authentication-5b176.firebaseapp.com",
  projectId: "authentication-5b176",
  storageBucket: "authentication-5b176.appspot.com",
  messagingSenderId: "654319724106",
  appId: "1:654319724106:web:66d79469091909a51128b3",
  measurementId: "G-7DC8YW6Y33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const db = getFirestore(app);


export { app, auth };
