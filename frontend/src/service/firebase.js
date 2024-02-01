import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI71dUCRTAKg3oFBmgS0sZK96x3-zakkw",
  authDomain: "counseling-6ceb2.firebaseapp.com",
  projectId: "counseling-6ceb2",
  storageBucket: "counseling-6ceb2.appspot.com",
  messagingSenderId: "237698997215",
  appId: "1:237698997215:web:e718fa74d0c0fd63bf026a",
  measurementId: "G-3C8PKG1HKR"
};;


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
