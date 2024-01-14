// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import fireBaseConfig from "../firebase.config.json"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Type for the configuration object
type FirebaseConfigType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Configuration as a typed object
const firebaseConfig: FirebaseConfigType = fireBaseConfig as FirebaseConfigType;

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);