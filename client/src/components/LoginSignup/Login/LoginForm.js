import { Button, FormHelperText, Link } from "@mui/material";

import InputField from "../../UI/InputField/InputField";

import classes from "./LoginForm.module.css";

import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../../contexts/auth-context";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";

const user = {
  email: "y0unggil0919@gmail.com",
  password: "abcd1234",
};

const LoginForm = ({ onClose, onClickSignup, onClickForgotPassword }) => {
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
      <LoginSignupModalForm onSubmit={loginFormSubmitHandler}>
        <LoginSignupModalContent>
          <div className={classes.inputs}>
            <InputField
              id="input-login-email"
              label="Email Address"
              type="email"
              inputRef={emailInputRef}
              className={classes.inputField}
            />
            <InputField
              id="input-login-password"
              label="Password"
              type="password"
              inputRef={passwordInputRef}
            />
            <FormHelperText
              error
              style={{ visibility: `${error ? "visible" : "hidden"}` }}
            >
              Incorrect email or password
            </FormHelperText>
          </div>

          <div className={classes.links}>
            <Link color="textSecondary" href="/signup" onClick={onClickSignup}>
              New user? Sign up here
            </Link>
            <Link
              color="textSecondary"
              href="/forgotPassword"
              onClick={onClickForgotPassword}
            >
              Forgot Password
            </Link>
          </div>
        </LoginSignupModalContent>
        <LoginSignupModalActions>
          <Button
            className={classes["login-btn"]}
            variant="contained"
            size="large"
            type="submit"
          >
            Continue
          </Button>
        </LoginSignupModalActions>
      </LoginSignupModalForm>
    </>
  );
};

export default LoginForm;
