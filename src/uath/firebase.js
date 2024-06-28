// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage } from "firebase/storage";

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
export const auth = getAuth(app);
export const imageDb = getStorage(app);
export default getFirestore(app);

