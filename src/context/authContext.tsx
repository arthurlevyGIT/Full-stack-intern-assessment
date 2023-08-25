'use client'
import React, { createContext, useContext, useState } from 'react';

// This context is used to track if the user is authenticated or not
const AuthContext = createContext({
  authenticated: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const userData = localStorage.getItem('userData');
  let isAuthenticated = false;
  if (userData)
    isAuthenticated = true;

  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);