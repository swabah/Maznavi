// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBcn04zSvISXyfykwKCBtswpccNX8vvBQ",
    authDomain: "maznavi-bced2.firebaseapp.com",
    projectId: "maznavi-bced2",
    storageBucket: "maznavi-bced2.appspot.com",
    messagingSenderId: "600891478774",
    appId: "1:600891478774:web:9365501c01d75ccf9692d7",
    measurementId: "G-HPHNG39KFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)