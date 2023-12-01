// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyCWmHsELsPzogxz4eUia-vcWeCUOAinaXE",
  authDomain: "chatroom-10694.firebaseapp.com",
  projectId: "chatroom-10694",
  storageBucket: "chatroom-10694.appspot.com",
  messagingSenderId: "817940718488",
  appId: "1:817940718488:web:8291163be82fb2128381ed"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

