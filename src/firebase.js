// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4MKF95f78Sl2UANzqyq2WgdmLO3U43so",
  authDomain: "twitter-clone-aa47c.firebaseapp.com",
  projectId: "twitter-clone-aa47c",
  storageBucket: "twitter-clone-aa47c.appspot.com",
  messagingSenderId: "522216693035",
  appId: "1:522216693035:web:ecb0a515f298a127f6396e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export default app;
