import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIF7kGV2Xky3PC24obSqmencNHrulWTc0",
  authDomain: "clone-8a745.firebaseapp.com",
  projectId: "clone-8a745",
  storageBucket: "clone-8a745.appspot.com",
  messagingSenderId: "414298991041",
  appId: "1:414298991041:web:37d17ac567f553aa60e740",
  measurementId: "G-S8ZRF5ZG67",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = firebase.auth();
const database = firebase.database();

export {db, auth, database};
