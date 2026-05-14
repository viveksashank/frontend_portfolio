"use client";

import { useState } from "react";

import { AuthContext }
from "../contexts/AuthContext";

export default function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  // LOGIN
  const login = (userData) => {

    setUser(userData);

    setIsLoggedIn(true);
  };

  // LOGOUT
  const logout = () => {

    setUser(null);

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}