import { initializeApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAG9fNqncc88YgBGzK2N130RXKNN799LXs",
    authDomain: "centralcoffee-d826e.firebaseapp.com",
    projectId: "centralcoffee-d826e",
    storageBucket: "centralcoffee-d826e.firebasestorage.app",
    messagingSenderId: "681082194820",
    appId: "1:681082194820:web:b866a27cbb8acf3b782bd1",
    measurementId: "G-DWCWWZTNJE"
};


const firebase = initializeApp(firebaseConfig);//Inicialize o Firebase
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

export { auth, firestore, firebase}