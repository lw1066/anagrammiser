// context/AuthContext.js
import { useState, useEffect, createContext } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // initialize netlify identity
    netlifyIdentity.init();
  }, []);

  useEffect(() => {
    // update user state on 'init event
    netlifyIdentity.on('init', (user) => {
      setUser(user);
    });
     // update user state after login
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => {
      setUser(null);
    });
    netlifyIdentity.on('init', (user) => {
      setUser(user);
    });
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const contextValues = { user, login };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
