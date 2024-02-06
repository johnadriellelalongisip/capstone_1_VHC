import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
  });

  const setAuthTokens = (accessToken, refreshToken) => {
    setAuthState({ accessToken, refreshToken });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
