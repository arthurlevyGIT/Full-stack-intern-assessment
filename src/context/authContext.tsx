'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

// This context is used to track if the user is authenticated or not
const AuthContext = createContext({
  authenticated: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data)
      setAuthenticated(true);
  }, []);


  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
