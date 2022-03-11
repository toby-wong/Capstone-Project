import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import LoginForm from "./LoginForm";

const user = {
  email: "y0unggil0919@gmail.com",
  password: "abcd1234",
};

const Login = ({ onClose, onClickSignup, onClickForgotPassword }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail !== user.email || enteredPassword !== user.password)
      return setError(true);

    setError(false);

    authContext.onLogin();
  };

  return (
    <>
      <LoginSignupModalHeader title="Log in" onClose={onClose} />
      <LoginForm
        emailInputRef={emailInputRef}
        passwordInputRef={passwordInputRef}
        error={error}
        onSubmit={loginFormSubmitHandler}
        onClose={onClose}
        onClickSignup={onClickSignup}
        onClickForgotPassword={onClickForgotPassword}
      />
    </>
  );
};

export default Login;
