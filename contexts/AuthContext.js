import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext({});

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, token, setToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
