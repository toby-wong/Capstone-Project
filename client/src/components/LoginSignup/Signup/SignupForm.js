import { Button } from "@mui/material";
import { useRef } from "react";
import InputField from "../../UI/InputField/InputField";

import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import SignupEmailForm from "./SignupEmailForm";

import classes from "./SignupForm.module.css";
import SignupLegalnameInput from "./SignupLegalnameInput";
import SignupPasswordInput from "./SignupPasswordInput";
import SignupPhoneForm from "./SignupPhoneForm";
import SignupUsernameForm from "./SignupUsernameForm";

const SignupForm = ({ onSubmit, onClose }) => {
  const usernameInputRef = useRef();
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();
  const adminCodeInputRef = useRef();

  return (
    <LoginSignupModalForm onSubmit={onSubmit}>
      <LoginSignupModalContent className={classes.signupform}>
        <div className={classes["name-container"]}>
          <SignupUsernameForm usernameInputRef={usernameInputRef} />
          <SignupLegalnameInput
            firstnameInputRef={firstnameInputRef}
            lastnameInputRef={lastnameInputRef}
          />
        </div>

        <SignupPasswordInput passwordInputRef={passwordInputRef} />

        <div className={classes["contact-container"]}>
          <SignupPhoneForm phoneInputRef={phoneInputRef} />
          <SignupEmailForm emailInputRef={emailInputRef} />
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
