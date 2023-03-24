// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC50DJA-81ydY6fHgmKR0flea2_yejScDw",
  authDomain: "tpa-web-857b5.firebaseapp.com",
  projectId: "tpa-web-857b5",
  storageBucket: "tpa-web-857b5.appspot.com",
  messagingSenderId: "478870215890",
  appId: "1:478870215890:web:38024c834a7f6115e9e10b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)