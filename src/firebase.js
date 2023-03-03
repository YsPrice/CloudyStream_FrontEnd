// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMILz-SHYhSFZNAJRFizpJMffLFPkFce8",
  authDomain: "cloudy-78b67.firebaseapp.com",
  projectId: "cloudy-78b67",
  storageBucket: "cloudy-78b67.appspot.com",
  messagingSenderId: "352040185913",
  appId: "1:352040185913:web:05d6ba60292700090bdde8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;