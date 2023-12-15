import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyD4wuMPnPv6kUOOqnXvJGuopbZk93zo7JY',
  authDomain: 'potluck-1ef67.firebaseapp.com',
  projectId: 'potluck-1ef67',
  storageBucket: 'potluck-1ef67.appspot.com',
  messagingSenderId: '849384830952',
  appId: '1:849384830952:web:501c44f536b9b03152d65d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestoreDb = getFirestore(app);

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  firestoreDb,
};
