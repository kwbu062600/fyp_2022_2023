import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPYrO3eh_pdO21GiX5nTPN2x9mvks49i4",
  authDomain: "fyp-db-fbc63.firebaseapp.com",
  projectId: "fyp-db-fbc63",
  storageBucket: "fyp-db-fbc63.appspot.com",
  messagingSenderId: "504359947522",
  appId: "1:504359947522:web:b46484a9a62a06a81f061b",
  measurementId: "G-T0LNX7FZ0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);