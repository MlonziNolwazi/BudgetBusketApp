import { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const getAuth = localStorage.getItem('Status');
  const [isAuthenticated, setIsAuthenticated] = useState(getAuth === 'loggedIn' ? true : false);
    console.log("from the ciontext its self", isAuthenticated)

    useEffect(() => {
      const storedAuth = localStorage.getItem('Status');
      if (storedAuth) {
        setIsAuthenticated(storedAuth === 'loggedIn' ? true : false);
      }
    }, []);

  const login = () =>{
    setIsAuthenticated(true);
    localStorage.setItem('Status', 'loggedIn'); 
  }
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('Status', 'loggedOut');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
