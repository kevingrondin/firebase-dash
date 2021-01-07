import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState({
    loading: true,
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      let isAdmin = false;

      if (user) {
        const token = await user.getIdTokenResult();
        isAdmin = token.claims.admin;
      }

      setSession({ loading: false, user, isAdmin });
    });

    return () => unsubscribe();
  });

  return (
    <UserContext.Provider value={session}>
      {!session.loading && children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
