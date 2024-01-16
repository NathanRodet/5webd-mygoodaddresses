// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import fireBaseConfig from "../firebase.config.json"
import { initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
// Initialize Firebase authentication
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});
// Initialize Firebase database (Realtime Database)
export const firebaseDb = getDatabase(firebaseApp);
