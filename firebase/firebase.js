import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjp18XgeTCGGNPsPHephJ3QXu0suPHEYU",
  authDomain: "akilli-ev-dpu.firebaseapp.com",
  databaseURL:
    "https://akilli-ev-dpu-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "akilli-ev-dpu",
  storageBucket: "akilli-ev-dpu.appspot.com",
  messagingSenderId: "743989654721",
  appId: "1:743989654721:web:1789705ccb492dedddd040",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const database = getDatabase(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
const signInEmailAndPassword = (email, password) => {
  return setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const sendResetEmail = (email) => sendPasswordResetEmail(auth, email);
const onAuthChanged = (func) => onAuthStateChanged(auth, func);

export {
  database,
  auth,
  googleAuthProvider,
  signInEmailAndPassword,
  sendResetEmail,
  onAuthChanged,
};
