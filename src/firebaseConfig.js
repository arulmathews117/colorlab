import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAwZaJnAgt5wrQKb8blW2o7nZkZ6o5m-DA",
    authDomain: "colorlab-c173a.firebaseapp.com",
    projectId: "colorlab-c173a",
    storageBucket: "colorlab-c173a.appspot.com",
    messagingSenderId: "764404538677",
    appId: "1:764404538677:web:e211041fcc9c7fefe2807c"
};

export const app = initializeApp( firebaseConfig );
export const auth = getAuth(app);
export const database = getFirestore( app );
export const storage = getStorage(app)