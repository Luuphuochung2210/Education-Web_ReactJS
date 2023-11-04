import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"


const firebaseConfig = {
  apiKey: '${process.env.REDIRECT_API_KEY}',
  authDomain: '${process.env.REDIRECT_AUTH_DOMAIN}',
  projectId: "education-6cbf6",
  storageBucket: "education-6cbf6.appspot.com",
  messagingSenderId: "986598937138",
  appId: "1:986598937138:web:beca4adb7fda18d8b6e22b",
  measurementId: "G-LDYLX1WH59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);