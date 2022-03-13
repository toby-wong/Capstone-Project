import { Button, IconButton, Tabs } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useContext } from "react";

import LinkTab from "../UI/LinkTab/LinkTab";
import classes from "./MainHeaderNavigation.module.css";
import AuthContext from "../../contexts/auth-context";

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
        <LinkTab value="home" label="Home" href="/" />
        {authContext.isLoggedIn && (
          <LinkTab value="consumer" label="Consumer" href="/Consumer" />
        )}
        {authContext.isLoggedIn && (
          <LinkTab value="provider" label="Provider" href="/Provider" />
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
