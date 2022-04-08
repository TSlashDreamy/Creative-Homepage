import React, { useState, useEffect, useContext, createContext } from "react";
import { projectAuth } from "../firebase/config";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const sendSignInLinkToEmail = (email) => {
    return projectAuth
      .sendSignInLinkToEmail(email, {
        url: "https://tslashdreamy.github.io/#/confirm",
        handleCodeInApp: true,
      })
      .then(() => {
        return true;
      });
  };

  const signInWithEmailLink = (email, code) => {
    return projectAuth.signInWithEmailLink(email, code).then((result) => {
      setUser(result.user);
      return true;
    });
  };

  const logout = () => {
    return projectAuth.signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    isAuthenticating,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
