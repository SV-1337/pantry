// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0LbXilrueCEpnz2iw7yOTOLd-XtfDVnQ",
  authDomain: "pantry-7212f.firebaseapp.com",
  projectId: "pantry-7212f",
  storageBucket: "pantry-7212f.firebasestorage.app",
  messagingSenderId: "519449019260",
  appId: "1:519449019260:web:898ec97b6b2ecd1b7a9af9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {
    app,
    firestore
}
