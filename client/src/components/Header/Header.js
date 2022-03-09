import classes from "./Header.module.css";

import logo from "../../assets/logo.svg";

import { Button } from "@mui/material";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <img src={logo} alt="logo" />
        <p className={classes.brandname}>PARK IT</p>
      </div>
      <div className={classes.header__right}>
        <div className={classes.header__tabs}>
          <a className={classes.active} href="/">
            Home
          </a>
          <a href="/">Consumer</a>
          <a href="/">Provider</a>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes["login-button"]}
        >
          Log In / Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Header;
