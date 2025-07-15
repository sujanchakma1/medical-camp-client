// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa36U2FhtLcQgOjne0heQFGRJM6LK3dPM",
  authDomain: "medical-camp-client.firebaseapp.com",
  projectId: "medical-camp-client",
  storageBucket: "medical-camp-client.firebasestorage.app",
  messagingSenderId: "896331488767",
  appId: "1:896331488767:web:fa5318ead327a14d62dbca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);