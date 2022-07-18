import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD97nu3MO1BiyIT8I3kCA3RafJ5jPdPcYs",
  authDomain: "snapchat-clone-f0ebe.firebaseapp.com",
  projectId: "snapchat-clone-f0ebe",
  storageBucket: "snapchat-clone-f0ebe.appspot.com",
  messagingSenderId: "949980449512",
  appId: "1:949980449512:web:cf855f60a29dfc4c8d975d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider, storage };
