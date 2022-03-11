import { useContext, useRef, useState } from "react";

import AuthContext from "../../store/auth-context";
import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import ForgetPasswordForm from "../ForgetPasswordForm/ForgetPasswordForm";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import LoginSignupModalHeader from "./LoginSignupModalHeader";

const user = {
  email: "y0unggil0919@gmail.com",
  password: "abcd1234",
};

const LoginSignupModal = ({ open, onClose }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);
  const [page, setPage] = useState("login");

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail !== user.email || enteredPassword !== user.password)
      return setError(true);

    setError(false);

    authContext.onLogin();
  };

  const signupClickHandler = (e) => {
    e.preventDefault();

    setPage("signup");
  };

  const forgotPasswordClickHandler = (e) => {
    e.preventDefault();

    setPage("forgetPassword");
  };

  const backToLoginFormHandler = (e) => {
    setPage("login");
  };

  return (
    <GeneralModal
      open={open}
      onClose={onClose}
      height="500px"
      width="500px"
      flexDirection="column"
    >
      {page === "login" && (
        <>
          <LoginSignupModalHeader title="Log in" onClose={onClose} />
          <LoginForm
            emailInputRef={emailInputRef}
            passwordInputRef={passwordInputRef}
            error={error}
            onSubmit={loginFormSubmitHandler}
            onClose={onClose}
            onSignupClick={signupClickHandler}
            onForgetPasswordClick={forgotPasswordClickHandler}
          />
        </>
      )}
      {page === "signup" && (
        <>
          <LoginSignupModalHeader title="Sign up" onClose={onClose} />
          <SignupForm />
        </>
      )}
      {page === "forgetPassword" && (
        <>
          <LoginSignupModalHeader
            title="Forget Password"
            onClose={onClose}
            onBack={backToLoginFormHandler}
          />
          <ForgetPasswordForm />
        </>
      )}
    </GeneralModal>
  );
};

export default LoginSignupModal;
