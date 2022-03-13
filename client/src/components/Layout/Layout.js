import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginSignupModal from "../LoginSignup/LoginSignupModal/LoginSignupModal";
import MainHeader from "../MainHeader/MainHeader";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isLoginSignupModalOpen, setIsLoginSignupModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginSignupModal = () => {
    navigate("/login");
    setIsLoginSignupModalOpen(true);
  };

  const closeLoginSignupModal = () => {
    navigate("/");
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
