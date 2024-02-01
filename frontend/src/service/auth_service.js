import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseApp from './firebase';

class AuthService {
  login(providerName) {
   
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    console.log("login메소드 들어옴   "+ providerName);
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }


  onAuthChange(onUserChanged){
    firebase.auth().onAuthStateChanged(user => {
        onUserChanged(user);
    })
    
  }
}

export default AuthService;
