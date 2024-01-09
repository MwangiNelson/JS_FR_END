// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDU-L-SqfSOhdqJxdKVyrT1a5y4H0mqKmM",
  authDomain: "recette-cd6aa.firebaseapp.com",
  projectId: "recette-cd6aa",
  storageBucket: "recette-cd6aa.appspot.com",
  messagingSenderId: "340336757116",
  appId: "1:340336757116:web:e7fc6cd1fb333f7cba7cf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app); 

