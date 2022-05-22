// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAk2nCMXnE2lvJ4W8NazTALwSqHckfsCQQ",
    authDomain: "imago-de8a8.firebaseapp.com",
    projectId: "imago-de8a8",
    storageBucket: "imago-de8a8.appspot.com",
    messagingSenderId: "271608673039",
    appId: "1:271608673039:web:44c1dfade83fa61ed3447a",
    measurementId: "G-7Q5CP7Y8ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

