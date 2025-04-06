import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzWtfwnNhIFsypHlshbCyEqQKe23LgDnY",
  authDomain: "template-eb525.firebaseapp.com",
  projectId: "template-eb525",
  storageBucket: "template-eb525.firebasestorage.app",
  messagingSenderId: "289606159742",
  appId: "1:289606159742:web:8dbb03eede55b95e85b72f",
  measurementId: "G-SXZDVWQGZX",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { db, storage, provider, auth };
