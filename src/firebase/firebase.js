import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDJG_6FpXbNdOCOtqj2biCLLHU-6twGJ6w",
    authDomain: "temp-movies.firebaseapp.com",
    databaseURL: "https://temp-movies-default-rtdb.firebaseio.com/",
    projectId: "temp-movies",
    storageBucket: "temp-movies.appspot.com",
    messagingSenderId: "264380190327",
    appId: "1:264380190327:web:fd8d99b664a7a15b190072",
    measurementId: "G-WDR7HS36QL"
  }

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };