import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCD3gv4PBrMQJl5DFGSbnovs1JpVmz4b9g",
  authDomain: "instagram-clone-3ef1a.firebaseapp.com",
  databaseURL:
    "https://instagram-clone-3ef1a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "instagram-clone-3ef1a",
  storageBucket: "instagram-clone-3ef1a.appspot.com",
  messagingSenderId: "586863697935",
  appId: "1:586863697935:web:3aa6a7049bb8a709da437a",
  measurementId: "G-N67XXNXFBD",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
