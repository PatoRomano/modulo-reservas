import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const initialAuth = null;
const initialUser = null;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);
  const [user, setUser] = useState(initialUser);

  const handleAuth = () => {
    setAuth((prevAuth) => !prevAuth);
  };

  const handleUser = (userData) => {
    setUser(userData);
  };

  const data = { auth, user, handleAuth, handleUser };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
