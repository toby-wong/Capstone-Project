import { useState } from "react";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import LoginForm from "../Login/LoginForm";
import SignupForm from "../Signup/SignupForm";
import SignupSuccess from "../SignupSuccess/SignupSuccess";

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

  const signupFormSubmitHandler = () => {
    setPage("signupSuccess");
  };

  const modalCloseHandler = () => {
    setPage("login");
    onClose();
  };

  const backToLoginFormHandler = (e) => {
    setPage("login");
  };

  return (
    <GeneralModal
      open={open}
      onClose={modalCloseHandler}
      height={page === "signup" ? "580px" : "500px"}
      width={page === "signup" ? "900px" : "500px"}
      flexDirection="column"
    >
      {page === "login" && (
        <LoginForm
          onClose={onClose}
          onClickSignup={signupClickHandler}
          onClickForgotPassword={forgotPasswordClickHandler}
        />
      )}
      {page === "signup" && (
        <SignupForm
          onSubmit={signupFormSubmitHandler}
          onClose={modalCloseHandler}
        />
      )}
      {page === "signupSuccess" && (
        <SignupSuccess onClose={modalCloseHandler} />
      )}
      {page === "forgotPassword" && (
        <ForgotPassword
          onClose={modalCloseHandler}
          onBack={backToLoginFormHandler}
        />
      )}
    </GeneralModal>
  );
};

export default LoginSignupModal;
