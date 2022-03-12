import { Button } from "@mui/material";
import { useReducer } from "react";

import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import SignupEmailInput from "./SignupEmailInput";

import classes from "./SignupForm.module.css";
import SignupLegalnameInput from "./SignupLegalnameInput";
import SignupPasswordInput from "./SignupPasswordInput";
import SignupUsernameInput from "./SignupUsernameInput";

import SignupAdminCodeInput from "./SignupAdminCodeInput";
import {
  signupformInitialState,
  signupformStateReducer,
} from "./signupform-reducer";

const SignupForm = ({ onSubmit, onClose }) => {
  const [formState, dispatchFormState] = useReducer(
    signupformStateReducer,
    signupformInitialState
  );

  return (
    <LoginSignupModalForm onSubmit={onSubmit}>
      <LoginSignupModalContent className={classes.signupform}>
        <div className={classes["row-container-top"]}>
          <SignupUsernameInput
            state={formState.username}
            onChange={dispatchFormState}
          />
          <SignupLegalnameInput
            state={formState.legalname}
            onChange={dispatchFormState}
          />
        </div>

        <SignupPasswordInput
          state={formState.password}
          onChange={dispatchFormState}
        />

        <div className={classes["row-container-bottom"]}>
          <SignupEmailInput
            state={formState.email}
            onChange={dispatchFormState}
          />
          <SignupAdminCodeInput
            state={formState.adminCode}
            onChange={dispatchFormState}
          />
        </div>
      </LoginSignupModalContent>

      <LoginSignupModalActions>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!formState.isFormValid}
        >
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
