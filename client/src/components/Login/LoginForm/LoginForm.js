import { Button, FormHelperText, Link } from "@mui/material";

import InputField from "../../UI/InputField/InputField";

import classes from "./LoginForm.module.css";

import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";

const LoginForm = ({
  emailInputRef,
  passwordInputRef,
  error,
  onSubmit,
  onSignupClick,
  onForgetPasswordClick,
}) => {
  return (
    <LoginSignupModalForm onSubmit={onSubmit}>
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
          <Link color="textSecondary" href="/signup" onClick={onSignupClick}>
            New user? Sign up here
          </Link>
          <Link
            color="textSecondary"
            href="/forgotPassword"
            onClick={onForgetPasswordClick}
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
  );
};

export default LoginForm;
