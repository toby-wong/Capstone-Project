import { Button, IconButton, Tab, Tabs } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useContext } from "react";

import classes from "./MainHeaderNavigation.module.css";
import AuthContext from "../../contexts/auth-context";
import { Link, useLocation } from "react-router-dom";
import LoginSignupModalContext from "../../contexts/login-signup-modal-context";

const LoginSignupButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" size="large" onClick={onClick}>
      Log In / Sign Up
    </Button>
  );
};

const UserAccountButton = () => {
  return (
    <IconButton size="large" color="primary">
      <AccountCircleIcon fontSize="large" />
    </IconButton>
  );
};

const MainHeaderNavigation = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const loginSignupModalContext = useContext(LoginSignupModalContext);

  return (
    <div className={classes.headerNavigation}>
      <Tabs className={classes.tabs} value={location.pathname}>
        <Tab component={Link} to="/" value="/" label="Home" />
        {authContext.isLoggedIn && (
          <Tab
            component={Link}
            to="/consumer"
            value="/consumer"
            label="Consumer"
          />
        )}
        {authContext.isLoggedIn && (
          <Tab
            component={Link}
            to="/provider"
            value="/provider"
            label="Provider"
          />
        )}
        {authContext.isAdmin && (
          <Tab component={Link} to="/admin" value="/admin" label="Admin" />
        )}
      </Tabs>

      {!authContext.isLoggedIn ? (
        <LoginSignupButton onClick={loginSignupModalContext.openModal} />
      ) : (
        <UserAccountButton />
      )}
    </div>
  );
};

export default MainHeaderNavigation;
