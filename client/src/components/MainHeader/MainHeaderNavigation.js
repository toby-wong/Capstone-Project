import { Button, IconButton, Tab, Tabs } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./MainHeaderNavigation.module.css";

import AuthContext from "../../contexts/auth-context";
import LoginSignupModalContext from "../../contexts/login-signup-modal-context";
import AccountMenu from "./AccountMenu/AccountMenu";

const LoginSignupButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" size="large" onClick={onClick}>
      Log In / Sign Up
    </Button>
  );
};

const UserAccountButton = ({ onClick }) => {
  return (
    <IconButton size="large" color="primary" onClick={onClick}>
      <AccountCircleIcon fontSize="large" />
    </IconButton>
  );
};

const MainHeaderNavigation = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const loginSignupModalContext = useContext(LoginSignupModalContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const openAccountMenuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAccountMenuHandler = () => {
    setAnchorEl(null);
  };

  const markingPaths = ["/", "/consumer", "/admin"];
  // const activeTab = markingPaths.includes(location.pathname)
  //   ? location.pathname
  //   : location.pathname.includes("provider")
  //     ? "/provider/listView/active"
  //     : false;
  const activeTab = markingPaths.includes(location.pathname)
    ? location.pathname
    : false

  return (
    <div className={classes.headerNavigation}>
      <Tabs className={classes.tabs} value={activeTab}>
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
            to="/provider/listView/active"
            value="/provider/listView/active"
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
        <UserAccountButton onClick={openAccountMenuHandler} />
      )}

      <AccountMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeAccountMenuHandler}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
    </div>
  );
};

export default MainHeaderNavigation;
