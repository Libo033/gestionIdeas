import { auth } from "@/libs/firebase";
import { IAuthContext } from "@/libs/interfaces";
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { useEffect, useState, createContext } from "react";

const defaultValue: IAuthContext = {
  user: null,
  googleSignIn: null,
  facebookSignIn: null,
  logOut: null,
  loaded: false,
};

export const AuthContext: React.Context<IAuthContext> =
  createContext(defaultValue);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const facebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
      }
      setLoaded(true);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ loaded, user, logOut, googleSignIn, facebookSignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
