// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "health-donald.firebaseapp.com",
  databaseURL:
    "https://health-donald-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "health-donald",
  storageBucket: "health-donald.appspot.com",
  messagingSenderId: "738914753728",
  appId: "1:738914753728:web:92d8885b4f9b6f55ee6125",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
