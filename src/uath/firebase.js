// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, RecaptchaVerifier, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, updateCurrentUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGs51aBUi9EfNStFjXQSdMUuANkm9ae0I",
  authDomain: "budgetbusket.firebaseapp.com",
  databaseURL: "https://budgetbusket-default-rtdb.firebaseio.com",
  projectId: "budgetbusket",
  storageBucket: "budgetbusket.appspot.com",
  messagingSenderId: "446650248893",
  appId: "1:446650248893:web:32ee238a6551dd26e4d1d4",
  measurementId: "G-E7MLCE5E2G"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const imageDb = getStorage(app);

export {app, auth, imageDb, firebaseConfig , RecaptchaVerifier, createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword, updateCurrentUser,sendPasswordResetEmail};
export default getFirestore(app);