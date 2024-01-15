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
 
  // Define a function to update global variables upon login
  const login = () => {
    // TODO: save token cookie 
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  // Define a function to update global variables upon login
  const logout = () => {
    // TODO: remove token cookie 
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };
  
  // Define a function to update the global varibale within a child component
  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
    sessionStorage.setItem('isLoggedIn', JSON.stringify(status));
  };

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, setLoginStatus}}>
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
