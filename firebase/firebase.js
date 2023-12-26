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
  apiKey: " ",
  authDomain: " ",
  databaseURL: " ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " ",
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
