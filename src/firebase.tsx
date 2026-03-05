import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase (Next.js Friendly way)
// Ye check karta hai ki app pehle se bani toh nahi hai, taaki baar-baar initialize na ho
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Database aur Auth export
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics export (Sirf Client-side par chalne ke liye condition)
export const analytics = typeof window !== "undefined" 
  ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
  : null;

export default app;