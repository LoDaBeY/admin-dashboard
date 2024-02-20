// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2puKh4dJ29JlGRIw7oEl7KnG-1OtSig4",
  authDomain: "dashboard-admin-khaled-ghonim.firebaseapp.com",
  projectId: "dashboard-admin-khaled-ghonim",
  storageBucket: "dashboard-admin-khaled-ghonim.appspot.com",
  messagingSenderId: "65944104424",
  appId: "1:65944104424:web:d86be85b7408862afb885d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
