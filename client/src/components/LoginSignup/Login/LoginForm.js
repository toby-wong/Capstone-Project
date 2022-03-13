import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  CircularProgress,
  FormHelperText,
  Link as MuiLink,
} from "@mui/material";

import classes from "./LoginForm.module.css";

import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import AuthContext from "../../../contexts/auth-context";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import InputField from "../../UI/InputField/InputField";
import useHttp from "../../../hooks/use-http";
import * as config from "../../../config";

const LoginForm = ({
  onSubmit,
  onClose,
  onClickSignup,
  onClickForgotPassword,
}) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [isLoading, sendRequest] = useHttp();

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();

    const loginResponse = await sendRequest(
      `${config.SERVER_URL}/api/auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        },
      }
    );

    if (loginResponse.status >= 300) {
      return setError(true);
    }

    const authToken = loginResponse.data.access_token;

    setError(false);

    authContext.login(authToken);

    onClose();
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
            <MuiLink
              color="textSecondary"
              href="/signup"
              onClick={onClickSignup}
            >
              New user? Sign up here
            </MuiLink>
            <MuiLink
              color="textSecondary"
              href="/forgotPassword"
              onClick={onClickForgotPassword}
            >
              Forgot Password
            </MuiLink>
          </div>
        </LoginSignupModalContent>
        <LoginSignupModalActions>
          <Button
            className={classes["login-btn"]}
            variant="contained"
            size="large"
            type="submit"
          >
            {isLoading && <CircularProgress size={26} />}
            {!isLoading && "Continue"}
          </Button>
        </LoginSignupModalActions>
      </LoginSignupModalForm>
    </>
  );
};

export default LoginForm;
