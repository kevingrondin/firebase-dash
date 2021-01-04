import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState({
    loading: true,
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setSession({ loading: false, user }));

    return () => unsubscribe();
  });

  return (
    <UserContext.Provider value={{ session }}>
      {!session.loading && children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
