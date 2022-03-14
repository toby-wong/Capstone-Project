import { Button, IconButton, Tab, Tabs } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useContext } from "react";

import classes from "./MainHeaderNavigation.module.css";
import AuthContext from "../../contexts/auth-context";
import { Link } from "react-router-dom";

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

const MainHeaderNavigation = ({ onLoginClick }) => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes.headerNavigation}>
      <Tabs className={classes.tabs} value={"home"}>
        <Tab component={Link} to="/" value="home" label="Home" />
        {authContext.isLoggedIn && (
          <Tab
            component={Link}
            to="/consumer"
            value="consumer"
            label="Consumer"
          />
        )}
        {authContext.isLoggedIn && (
          <Tab
            component={Link}
            to="/provider"
            value="provider"
            label="Provider"
          />
        )}
        {authContext.isAdmin && (
          <Tab component={Link} to="/admin" value="admin" label="Admin" />
        )}
      </Tabs>

      {!authContext.isLoggedIn ? (
        <LoginSignupButton onClick={onLoginClick} />
      ) : (
        <UserAccountButton />
      )}
    </div>
  );
};

export default MainHeaderNavigation;
