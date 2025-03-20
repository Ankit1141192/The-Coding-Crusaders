import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  let navigate = null;
  try {
    navigate = useNavigate(); // 🚀 Use only when inside Router
  } catch (error) {
    console.warn("useNavigate() used outside Router, ignoring...");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user && navigate) navigate("/home");
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
    if (navigate) navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
