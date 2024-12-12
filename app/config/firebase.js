import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5oD1S0VH5xGNyjBEjM-0SXhGJ11xEWWA",
  authDomain: "esp32-firebase-demo-39ba1.firebaseapp.com",
  databaseURL: "https://esp32-firebase-demo-39ba1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-firebase-demo-39ba1",
  storageBucket: "esp32-firebase-demo-39ba1.firebasestorage.app",
  messagingSenderId: "702640872865",
  appId: "1:702640872865:web:3aab887cf8d82baa62bfe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const database = getDatabase(app);

export { database, ref, set, onValue };
