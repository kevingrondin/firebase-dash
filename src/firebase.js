import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

console.log("firebase option", firebase.app().options);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const signup = async ({ firstName, lastName, email, password }) => {
  let resp = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      console.log("ERREUR_FIREBASE_CREATE-USER", err);
      return err;
    });
  let user = resp.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  return user;
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
  let resp = await firebase.auth().signInWithEmailAndPassword(email, password);
  // let user = resp.user;
  // await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  // return user;
};
