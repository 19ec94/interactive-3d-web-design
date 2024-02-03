import { createContext, useContext, useState }  from 'react';

// 1. Create a context to store authentication details
const AuthContext = createContext();

// 2. Create a provider component to provide values to children component
export const AuthProvider = ({ children }) => {
  // Define varibale to hold session data
  // NOTE: This data will be displayed in dashboard
  const [sessionData, setSessionData] = useState({
    isLoggedIn: false,
    sessionToken: '',
    userName: '',
    userEmail: ''
  });

  const setSessionDataGlobally = (sessionData) => {
    setSessionData(sessionData);
    sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
  };

  return (
    <AuthContext.Provider value={{sessionData, setSessionDataGlobally}}>
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
