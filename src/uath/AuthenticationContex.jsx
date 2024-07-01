import { createContext, useContext, useState, useEffect } from "react";
import { put } from "../data/service/api";
// Create a context for authentication
const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const getAuth = localStorage.getItem('Status');
    
  const [isAuthenticated, setIsAuthenticated] = useState(getAuth === 'loggedIn' ? true : false);

  const user = JSON.parse(localStorage.getItem('LoggedInUserDetails'));
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(user);



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


  function omitProperty(obj, propertyToOmit) {
    const { [propertyToOmit]: omitted, ...rest } = obj;
    return rest;
  }

 const  upDateUserDetails = async (data) => {
  debugger
    const { id } = data;
    if(id){
        put({ table: "users", id ,updateRecord: omitProperty(data, 'password') }).then((record) => {

        setLoggedInUserDetails(data);
        console.log(omitProperty(data, 'password'), "Record added:", record);   

        })
        .catch((error) => {

        console.error("Error adding record:", error);

        });
        localStorage.setItem('LoggedInUserDetails', JSON.stringify(data));
    }
  }



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loggedInUserDetails, upDateUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
