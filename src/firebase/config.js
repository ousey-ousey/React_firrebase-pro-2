// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5mBc2aahKBHTJmJ9w3ETsqFIx2dr_C-c",
  authDomain: "react-project-427a3.firebaseapp.com",
  projectId: "react-project-427a3",
  storageBucket: "react-project-427a3.appspot.com",
  messagingSenderId: "975813621069",
  appId: "1:975813621069:web:8e75d71e85c51bebbc3304",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
