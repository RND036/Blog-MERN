// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    //when we are using vite we cant use process.env so we have to use import.meta.env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e26a7.firebaseapp.com",
  projectId: "mern-blog-e26a7",
  storageBucket: "mern-blog-e26a7.firebasestorage.app",
  messagingSenderId: "494417349517",
  appId: "1:494417349517:web:14c14cf9bb96ea90bf8bc4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);