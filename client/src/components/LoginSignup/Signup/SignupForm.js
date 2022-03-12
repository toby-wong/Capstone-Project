import { Button, FormHelperText } from "@mui/material";
import { useRef } from "react";
import InputField from "../../UI/InputField/InputField";

import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";

import classes from "./SignupForm.module.css";

const SignupForm = ({ onSubmit, onClose }) => {
  const usernameInputRef = useRef();
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const adminCodeInputRef = useRef();

  return (
    <LoginSignupModalForm onSubmit={onSubmit}>
      <LoginSignupModalContent className={classes.signupform}>
        <div className={classes["name-container"]}>
          <div className={classes["name-container__username"]}>
            <InputField
              id="input-signup-username"
              label="Username"
              type="text"
              size="small"
              inputRef={usernameInputRef}
              required={true}
            />
            <Button variant="contained" color="secondary" size="medium">
              Check
            </Button>
            <FormHelperText className={classes["form-helper-text"]}>
              - Username should be less than 20 characters
            </FormHelperText>
          </div>
          <div className={classes["name-container__legalname"]}>
            <InputField
              id="input-signup-firstname"
              label="First name"
              type="text"
              size="small"
              inputRef={firstnameInputRef}
              required={true}
            />
            <InputField
              id="input-signup-lastname"
              label="Last name"
              type="text"
              size="small"
              inputRef={lastnameInputRef}
              required={true}
            />
          </div>
        </div>
        <div className={classes["password-container"]}>
          <div className={classes["password-container__password"]}>
            <InputField
              id="input-signup-password"
              label="Password"
              type="password"
              size="small"
              inputRef={passwordInputRef}
              required={true}
            />
            <FormHelperText
              className={`${classes["form-helper-text"]} ${classes["password-helper-text"]}`}
            >
              - Password should be between 8 and 32 characters
              <br />
              - Password should contain at least one lowercase
              <br />
              - Password should contain at least one uppercase
              <br />- Password should contain at least one digit
            </FormHelperText>
          </div>
          <div className={classes["password-container__confirmPassword"]}>
            <InputField
              id="input-signup-confirmPassword"
              label="Confirm Password"
              type="password"
              size="small"
              inputRef={confirmPasswordInputRef}
              required={true}
            />
          </div>
        </div>
        <div className={classes["contact-container"]}>
          <div className={classes["contact-container__phone"]}>
            <InputField
              id="input-signup-phone"
              label="Phone number"
              type="tel"
              size="small"
              inputRef={phoneInputRef}
              required={true}
            />
            <Button variant="contained" color="secondary" size="medium">
              Send
            </Button>
          </div>
          <div className={classes["contact-container__email"]}>
            <InputField
              id="input-signup-email"
              label="Email address"
              type="email"
              size="small"
              inputRef={emailInputRef}
              required={true}
            />
            <Button variant="contained" color="secondary" size="medium">
              Send
            </Button>
          </div>
        </div>
        <div className={classes["admin-container"]}>
          <InputField
            id="input-signup-adminCode"
            label="Admin Code"
            type="text"
            size="small"
            inputRef={adminCodeInputRef}
          />
        </div>
      </LoginSignupModalContent>
      <LoginSignupModalActions>
        <Button variant="contained" size="large" type="submit">
          Sign up
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={onClose}
          className={classes["btn-cancel"]}
        >
          Cancel
        </Button>
      </LoginSignupModalActions>
    </LoginSignupModalForm>
  );
};

export default SignupForm;
