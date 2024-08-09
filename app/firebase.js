// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4_RLOFNrxoCppSfh5EIdMPnXjGd5IT_c",
    authDomain: "headstarter2.firebaseapp.com",
    projectId: "headstarter2",
    storageBucket: "headstarter2.appspot.com",
    messagingSenderId: "780947559506",
    appId: "1:780947559506:web:b0d274b2743ff49a1cfb8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {
    app,
    firestore
}