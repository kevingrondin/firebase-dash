import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

console.log("firebase option", firebase.app().options);

export const db = firebase.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();

// CRUD document firebase
export const createUserDocument = async (user) => {
  const docRef = db.doc(`/users/${user.uid}`);
  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    specialty: "",
    ip: "",
  };

  // write to Cloud Firestore
  return docRef.set(userProfile);
};
export const updateUserDocument = async (user) => {
  const docRef = db.doc(`/users/${user.uid}`);
  return docRef.update(user);
};

// AUTH firebase
export const signup = async ({ firstName, lastName, email, password }) => {
  const resp = await auth.createUserWithEmailAndPassword(email, password);
  const user = resp.user;
  await user.updateProfile({ displayName: `${firstName} ${lastName}` });
  await createUserDocument(user);
  return user;
};
export const logout = () => firebase.auth().signOut();
export const login = async ({ email, password }) => {
  const resp = await auth.signInWithEmailAndPassword(email, password);
  return resp.user;
};
