// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyDHQpalOp7JpeiiPaIggfvnvtKwhodwooE",
  authDomain: "mustaqil-talim-ai.firebaseapp.com",
  projectId: "mustaqil-talim-ai",
  storageBucket: "mustaqil-talim-ai.firebasestorage.app",
  messagingSenderId: "1070375034065",
  appId: "1:1070375034065:web:15f7e8e04fe84ffe88f9f0",
};

// Appni faqat bir marta initialize qilish
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase servislarini olish
const auth = getAuth(app);
const firestore = getFirestore(app);

// Tashqi fayllarga eksport
export { auth, firestore };
