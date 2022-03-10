import classes from "./Navbar.module.css";

import logo from "../../assets/logo.svg";

import { AppBar, Button, Tabs, Toolbar, Typography } from "@mui/material";
import LinkTab from "../UI/LinkTab/LinkTab";

const Navbar = (props) => {
  return (
    <AppBar className={classes.appbar} color="container" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.left}>
          <img className={classes.logo} src={logo} alt="logo" />
          <Typography variant="brandName" color="textSecondary">
            PARK IT
          </Typography>
        </div>
        <div className={classes.right}>
          <Tabs
            className={classes.tabs}
            value={"home"}
            indicatorColor="inherit"
          >
            <LinkTab value="home" label="Home" href="/" />
            <LinkTab value="consumer" label="Consumer" href="/Consumer" />
            <LinkTab value="provider" label="Provider" href="/Provider" />
          </Tabs>
          <Button variant="contained" color="primary" size="large">
            Log In / Sign Up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
