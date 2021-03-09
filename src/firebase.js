import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_apiKey,
    projectId: process.env.REACT_APP_FIREBASE_apiKey,
    storageBucket: process.env.REACT_APP_FIREBASE_apiKey,
    messagingSenderId: process.env.REACT_APP_FIREBASE_apiKey,
    appId: process.env.REACT_APP_FIREBASE_apiKey,
})