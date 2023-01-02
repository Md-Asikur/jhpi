// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2M1lSmGMvDIZrTojT16slGJvUtCQ_WMQ",
  authDomain: "projectt-a4f8e.firebaseapp.com",
  projectId: "projectt-a4f8e",
  storageBucket: "projectt-a4f8e.appspot.com",
  messagingSenderId: "310677222600",
  appId: "1:310677222600:web:a61582d850e887773161fd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
