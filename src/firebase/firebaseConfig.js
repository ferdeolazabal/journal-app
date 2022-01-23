import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8xeVFlu6GEaPYAegNu4XO1wrEhrN3jk4",
  authDomain: "journal-app-01.firebaseapp.com",
  projectId: "journal-app-01",
  storageBucket: "journal-app-01.appspot.com",
  messagingSenderId: "143835934132",
  appId: "1:143835934132:web:ff0515d165b5c060f696e1",
  measurementId: "G-VDCRVJ113B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

export {
  db,
  googleAuthProvider,
  firebase,
  auth,
};
