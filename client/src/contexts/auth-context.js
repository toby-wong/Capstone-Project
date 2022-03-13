import React, { useEffect, useState } from "react";

import useHttp from "../hooks/use-http";
import * as config from "../config";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem("parkItAuthToken");
  const [token, setToken] = useState(initialToken);
  const sendRequest = useHttp()[1];

  useEffect(() => {
    const setInitialToken = async () => {
      if (!initialToken) return;

      const response = await sendRequest(
        `${config.SERVER_URL}/api/auth/user/`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + initialToken,
          },
        }
      );

      if (response.status >= 300) {
        setToken(null);
        localStorage.removeItem("parkItAuthToken");
      }
    };

    setInitialToken();
  }, []);

  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("parkItAuthToken", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("parkItAuthToken");
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
