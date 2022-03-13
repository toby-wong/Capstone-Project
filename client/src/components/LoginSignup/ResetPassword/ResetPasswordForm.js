import { Button, FormHelperText, CircularProgress } from "@mui/material";
import { useReducer } from "react";
import { useParams } from "react-router-dom";

import {
  getResetPasswordformInitialState,
  resetPasswordFormReducer,
} from "../../../reducers/resetpasswordform-reducer";
import InputField from "../../UI/InputField/InputField";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";

import useHttp from "../../../hooks/use-http";
import * as config from "../../../config";

import classes from "./ResetPasswordForm.module.css";

const ResetPasswordForm = ({ onSubmit, onClose }) => {
  const [formState, dispatchFormState] = useReducer(
    resetPasswordFormReducer,
    getResetPasswordformInitialState()
  );
  const [isLoading, sendRequest] = useHttp();
  const { uid, token } = useParams();

  const passwordChangeHandler = (e) => {
    dispatchFormState({ type: "PASSWORD_INPUT", value: e.target.value });
  };

  const confirmPasswordChangeHandler = (e) => {
    dispatchFormState({
      type: "CONFIRM_PASSWORD_INPUT",
      value: e.target.value,
    });
  };

  const resetPasswordFormSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(uid, token, formState.password.passwordValue);

    const response = await sendRequest(
      `${config.SERVER_URL}/api/auth/password/reset/confirm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          new_password1: formState.password.passwordValue,
          new_password2: formState.password.confirmPasswordValue,
          uid: uid,
          token: token,
        },
      }
    );

    if (response.status >= 300 || !response.status) {
      console.log(response.data);
      return alert(response.data);
    }

    onSubmit();
  };

  return (
    <>
      <LoginSignupModalHeader title="Reset Password" onClose={onClose} />
      <LoginSignupModalForm onSubmit={resetPasswordFormSubmitHandler}>
        <LoginSignupModalContent>
          <div className={classes.inputs}>
            <InputField
              id="input-resetPassword-password"
              label="New Password"
              type="password"
              value={formState.password.passwordValue}
              onBlur={passwordChangeHandler}
              onChange={passwordChangeHandler}
              className={classes.inputField}
              error={
                !formState.password.isValidLength ||
                !formState.password.containsLower ||
                !formState.password.containsUpper ||
                !formState.password.containsDigit
              }
              required={true}
            />
            <div className={classes["helper-text-container"]}>
              <FormHelperText
                className={classes["helper-text"]}
                error={!formState.password.isValidLength}
              >
                - Password should be between 8 and 32 characters
              </FormHelperText>
              <FormHelperText
                className={classes["helper-text"]}
                error={!formState.password.containsLower}
              >
                - Password should contain at least one lowercase
              </FormHelperText>
              <FormHelperText
                className={classes["helper-text"]}
                error={!formState.password.containsUpper}
              >
                - Password should contain at least one uppercase
              </FormHelperText>
              <FormHelperText
                className={classes["helper-text"]}
                error={!formState.password.containsDigit}
              >
                - Password should contain at least one digit
              </FormHelperText>
            </div>
            <InputField
              id="input-resetPassword-confirmPassword"
              label="Confirm Password"
              type="password"
              value={formState.password.confirmPasswordValue}
              onBlur={confirmPasswordChangeHandler}
              onChange={confirmPasswordChangeHandler}
              error={!formState.password.isConfirmPasswordValid}
              required={true}
            />
          </div>
        </LoginSignupModalContent>
        <LoginSignupModalActions>
          <Button
            className={classes["login-btn"]}
            variant="contained"
            size="large"
            type="submit"
            disabled={!formState.isFormValid}
          >
            {isLoading && <CircularProgress size={26} />}
            {!isLoading && "Continue"}
          </Button>
        </LoginSignupModalActions>
      </LoginSignupModalForm>
    </>
  );
};

export default ResetPasswordForm;
