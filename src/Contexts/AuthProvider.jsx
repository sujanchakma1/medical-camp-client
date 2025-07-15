import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    setLoading();
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleProvider = new GoogleAuthProvider()
  const googleLogin = ()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
  const logOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = profileInfo =>{
    return updateProfile(auth.currentUser, profileInfo)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("inside the user:",currentUser)
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    loginUser,
    googleLogin,
    logOutUser,
    user,
    loading,
    updateUserProfile
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
