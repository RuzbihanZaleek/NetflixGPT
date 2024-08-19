// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX9rx8ypwVgNftuA_E9Ya_0S3Ynszkx4o",
  authDomain: "neflixgpt-3345d.firebaseapp.com",
  projectId: "neflixgpt-3345d",
  storageBucket: "neflixgpt-3345d.appspot.com",
  messagingSenderId: "1069067983074",
  appId: "1:1069067983074:web:8ab3152024667a2c9ba6bb",
  measurementId: "G-P0CN9MXE29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
