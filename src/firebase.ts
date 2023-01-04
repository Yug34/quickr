import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

export const app = initializeApp({
    apiKey: "AIzaSyCjyCHWs8BWO7knHrcNRuRRS-hhuHeyE7A",
    authDomain: "dive-chatapp-75701.firebaseapp.com",
    databaseURL: "https://dive-chatapp-75701-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dive-chatapp-75701",
    storageBucket: "dive-chatapp-75701.appspot.com",
    messagingSenderId: "289724640187",
    appId: "1:289724640187:web:bc58c1b224564ef617f29e",
    measurementId: "G-8H371CW2H1"
});
/* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */

export const database = getDatabase(app);
export const analytics = getAnalytics(app);