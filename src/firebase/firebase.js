import config from '../config/config';
import app from 'firebase/app';
import 'firebase/database'
import 'firebase/auth';

const firebaseConfig = {
  apiKey: config.REACT_APP_FIREBASE_KEY,
  authDomain: config.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: config.REACT_APP_FIREBASE_DATABASE,
  projectId: config.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: config.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.REACT_APP_FIREBASE_SENDER_ID
};


class FirebaseService {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
  }

  isAuthenticated() {
    return this.auth.currentUser;
  }

  currentUser() {
    return this.isAuthenticated() ? this.auth.currentUser.email : null;
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  updateUserProfile = (displayName) => 
    this.auth.currentUser.updateProfile({displayName: displayName});

  doSignOut = () => this.auth.signOut();

  fetchData = () => this.db.ref("items");

  updateItem =  uid => this.db.ref(`items/${uid}`);

}

export default FirebaseService;
