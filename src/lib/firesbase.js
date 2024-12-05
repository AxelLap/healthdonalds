import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Create a root reference (ipload de l'image voir documentation firebase)
export const storage = getStorage();
