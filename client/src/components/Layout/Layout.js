import { useState } from "react";
import LoginModal from "../Login/LoginModal";
import Navbar from "../Navbar/Navbar";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
      <Navbar onLoginButtonClick={openLoginModal} />
      {children}
    </div>
  );
};

export default Layout;
