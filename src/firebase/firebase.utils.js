import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB4viqxXXUz96JPMSKv7by8o5hea1ltpVc",
    authDomain: "tech-teacher-db.firebaseapp.com",
    databaseURL: "https://tech-teacher-db.firebaseio.com",
    projectId: "tech-teacher-db",
    storageBucket: "tech-teacher-db.appspot.com",
    messagingSenderId: "521395870719",
    appId: "1:521395870719:web:e282a78b20ffb28f2a25ca"
  };

firebase.initializeApp(config);

export const getUserRefFromDB = async (signedUser, additionalData) => {
  //The line below was in the course but seems redundant with App.js - AuthMonitor
  /* if (!signedUser) return; */
  //* get signedUser ref and snapshot 
  const userRef = firestore.doc(`users/${signedUser.uid}`);
  const userSnapshot = await userRef.get();

  //* if signedUser is new, send its data to DB 
  if(!userSnapshot.exists) {
    const {displayName, email} = signedUser;
    const createdAt = new Date();
    const userRole = '';

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        userRole,
        ...additionalData
      })
    } catch (error) {
      console.log("Problem sending User to DB", error.message)
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

