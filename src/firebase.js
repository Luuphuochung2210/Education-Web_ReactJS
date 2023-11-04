import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import { firebase } from '@firebase/app'
import '@firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCfn4Yo1tRuxu7pwJsAOH5LJV26-WCTxUs',
  authDomain: 'education-6cbf6.firebaseapp.com',
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