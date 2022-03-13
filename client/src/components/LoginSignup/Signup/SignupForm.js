import { Button, CircularProgress } from "@mui/material";
import { useReducer, useState } from "react";

import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import SignupEmailInput from "./SignupEmailInput";
import SignupLegalnameInput from "./SignupLegalnameInput";
import SignupPasswordInput from "./SignupPasswordInput";
import SignupUsernameInput from "./SignupUsernameInput";
import SignupAdminCodeInput from "./SignupAdminCodeInput";
import {
  getSignupformInitialState,
  signupformStateReducer,
} from "../../../reducers/signupform-reducer";
import SignupPhoneinput from "./SignupPhoneinput";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";

import classes from "./SignupForm.module.css";

import useHttp from "../../../hooks/use-http";
import * as config from "../../../config";
import SignupErrorModal from "./SignupErrorModal";

const SignupForm = ({ onSubmit, onClose }) => {
  const [isLoading, sendRequest] = useHttp();
  const [error, setError] = useState({ value: false, messages: [] });
  const [formState, dispatchFormState] = useReducer(
    signupformStateReducer,
    getSignupformInitialState()
  );

  const signupFormSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      username: formState.username.value,
      email: formState.email.value,
      password1: formState.password.passwordValue,
      password2: formState.password.confirmPasswordValue,
      phone_number: formState.phone.value,
      first_name: formState.legalname.firstnameValue,
      last_name: formState.legalname.lastnameValue,
      admin_code: formState.adminCode.value,
    };

    const requestConfig = {
      url: `${config.SERVER_URL}/api/auth/register/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    };

    const response = await sendRequest(requestConfig);

    if (response.status >= 300) {
      let messages = [];
      for (const errorText of Object.values(response.data)) {
        messages.push(errorText);
      }
      setError({ value: true, messages });
      return;
    }

    dispatchFormState({ type: "RESET" });
    onSubmit();
  };

  const signupErrorModalCloseHandler = () => {
    setError({ value: false, messages: [] });
  };

  return (
    <>
      <SignupErrorModal
        open={error.value}
        onClose={signupErrorModalCloseHandler}
        messages={error.messages}
      />
      <LoginSignupModalHeader title="Sign up" onClose={onClose} />
      <LoginSignupModalForm onSubmit={signupFormSubmitHandler}>
        <LoginSignupModalContent className={classes.signupform}>
          <div className={`${classes["row-container"]}`}>
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

          <div
            className={`${classes["row-container"]} ${classes["contact-container"]}`}
          >
            <SignupEmailInput
              state={formState.email}
              onChange={dispatchFormState}
            />
            <SignupPhoneinput
              state={formState.phone}
              onChange={dispatchFormState}
            />
          </div>
          <SignupAdminCodeInput
            state={formState.adminCode}
            onChange={dispatchFormState}
          />
        </LoginSignupModalContent>

        <LoginSignupModalActions>
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={!formState.isFormValid}
          >
            {isLoading && <CircularProgress size={26.5} />}
            {!isLoading && "Sign up"}
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
    </>
  );
};

export default SignupForm;
