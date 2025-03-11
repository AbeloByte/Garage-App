// import hooks from react
import React, { useState, useContext, useEffect } from "react";

// import the Auth file from the utilites
import getAuth from "../utils/auth";

// create the AuthContext
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
// create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee_data, setEmployeeData] = useState(null);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee_data };

  useEffect(() => {
    const getloginData = getAuth();

    getloginData.then((response) => {
      if (response.employee_token) {
        setIsLogged(true);
        if (response.employee_role === "admin") {
          setIsAdmin(true);
        }
        setEmployeeData(response);
      }
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
