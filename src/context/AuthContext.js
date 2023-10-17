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
      netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
    });

    netlifyIdentity.on('init', (user) => {
      setUser(user)
    });
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const contextValues = { user, login, logout };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
