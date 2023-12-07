// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-124dd.firebaseapp.com",
  projectId: "mern-auth-124dd",
  storageBucket: "mern-auth-124dd.appspot.com",
  messagingSenderId: "616962783740",
  appId: "1:616962783740:web:b9d2a09006ceadcfa91a79"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);