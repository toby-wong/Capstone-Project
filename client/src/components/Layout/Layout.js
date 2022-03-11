import { useState } from "react";
import LoginSignupModal from "../LoginSignup/LoginSignupModal/LoginSignupModal";
import MainHeader from "../MainHeader/MainHeader";
import AuthContext from "../store/auth-context";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isLoginSignupModalOpen, setIsLoginSignupModalOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginSignupModal = () => {
    setIsLoginSignupModalOpen(true);
  };

  const closeLoginSignupModal = () => {
    setIsLoginSignupModalOpen(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
    setIsLoginSignupModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogin: loginHandler }}
    >
      <div className={classes.root}>
        <LoginSignupModal
          open={isLoginSignupModalOpen}
          onClose={closeLoginSignupModal}
        />
        <MainHeader onLoginClick={openLoginSignupModal} />
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export default Layout;
