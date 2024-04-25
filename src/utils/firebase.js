// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPIS_qlmEhIT29RA4m7XM8WijVN277bls",
  authDomain: "tour-booking-firebase.firebaseapp.com",
  projectId: "tour-booking-firebase",
  storageBucket: "tour-booking-firebase.appspot.com",
  messagingSenderId: "185681843950",
  appId: "1:185681843950:web:9291b8e72330708f2305ff",
  measurementId: "G-029E9EQNY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const imageDb = getStorage();
export default app;