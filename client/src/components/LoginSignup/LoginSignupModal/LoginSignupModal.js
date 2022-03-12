import { useState } from "react";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const LoginSignupModal = ({ open, onClose }) => {
  const [page, setPage] = useState("login");

  const signupClickHandler = (e) => {
    e.preventDefault();
    setPage("signup");
  };

  const forgotPasswordClickHandler = (e) => {
    e.preventDefault();
    setPage("forgotPassword");
  };

  const backToLoginFormHandler = (e) => {
    setPage("login");
  };

  return (
    <GeneralModal
      open={open}
      onClose={onClose}
      height={page === "signup" ? "580px" : "500px"}
      width={page === "signup" ? "900px" : "500px"}
      flexDirection="column"
    >
      {page === "login" && (
        <Login
          onClose={onClose}
          onClickSignup={signupClickHandler}
          onClickForgotPassword={forgotPasswordClickHandler}
        />
      )}
      {page === "signup" && <Signup onClose={onClose} />}
      {page === "forgotPassword" && (
        <ForgotPassword onClose={onClose} onBack={backToLoginFormHandler} />
      )}
    </GeneralModal>
  );
};

export default LoginSignupModal;
