import { createContext, useContext, useState }  from 'react';

// 1. Create a context to store authentication details
const AuthContext = createContext();

// 2. Create a provider component to provide values to children component
export const AuthProvider = ({ children }) => {
  // Define variable to hold login status
  const [isLoggedIn, setIsLoggedIn] = useState( () => {
    const storedStatus = sessionStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : false;
  });
  // Define varibale to hold session token
  const [sessionToken, setSessionToken] = useState( () => {
    const storedToken = sessionStorage.getItem('sessionToken');
    return storedToken ? JSON.parse(storedToken) : '';
  });
 
  // Define a function to update global variables upon login
  // TODO: Find a better way to set and remove global variables
  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  // Define a function to update global variables upon logout
  // TODO: Find a better way to set and remove global variables upon login
  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };
  
  // Define a function to update the global varibale within a child component
  const setLoginStatusGlobally = (status) => {
    setIsLoggedIn(status);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(status));
  };
  const setSessionTokenGlobally = (sessionToken) => {
    setSessionToken(sessionToken);
    sessionStorage.setItem('sessionToken', JSON.stringify(sessionToken));
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, sessionToken, login, logout, setLoginStatusGlobally, setSessionTokenGlobally}}>
      { children }
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
