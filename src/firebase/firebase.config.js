// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,

  //   apiKey: "AIzaSyAlWyWthouNSEu_J30FDdjg4x7JyKz_xyg",
  //   authDomain: "task-management-system-896f5.firebaseapp.com",
  //   projectId: "task-management-system-896f5",
  //   storageBucket: "task-management-system-896f5.appspot.com",
  //   messagingSenderId: "717220546746",
  //   appId: "1:717220546746:web:cbdaca52120db095ec9a83",
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
