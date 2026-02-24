// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYN9_eGNiDhh7cJeLBXw0OI7_GDQdyLXI",
  authDomain: "login-authentication-a4177.firebaseapp.com",
  projectId: "login-authentication-a4177",
  storageBucket: "login-authentication-a4177.firebasestorage.app",
  messagingSenderId: "31257471736",
  appId: "1:31257471736:web:b2a5132bfef3275f3ca90d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;