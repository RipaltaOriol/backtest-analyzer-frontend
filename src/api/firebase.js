// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcxBzIeVK9wRi6lmJ7q2rCVIVuR-uUdBA",
    authDomain: "trade-sharpener-chat.firebaseapp.com",
    projectId: "trade-sharpener-chat",
    storageBucket: "trade-sharpener-chat.appspot.com",
    messagingSenderId: "464371295363",
    appId: "1:464371295363:web:90676bfbc8f991550f27b6",
    measurementId: "G-CY61TREC7G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
