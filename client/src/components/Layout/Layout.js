import { useState } from "react";

import LoginSignupModal from "../LoginSignup/LoginSignupModal/LoginSignupModal";
import MainHeader from "../MainHeader/MainHeader";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isLoginSignupModalOpen, setIsLoginSignupModalOpen] = useState(false);

  const openLoginSignupModal = () => {
    setIsLoginSignupModalOpen(true);
  };

  const closeLoginSignupModal = () => {
    setIsLoginSignupModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <LoginSignupModal
        open={isLoginSignupModalOpen}
        onClose={closeLoginSignupModal}
      />
      <MainHeader onLoginClick={openLoginSignupModal} />
      {children}
    </div>
  );
};

export default Layout;
