import {
  Button,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

import InputField from "../../UI/InputField/InputField";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import useHttp from "../../../hooks/use-http";
import * as config from "../../../config";

import classes from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = ({ onSubmit, onClose, onBack }) => {
  const emailInputRef = useRef();
  const [isLoading, sendRequest] = useHttp();
  const [error, setError] = useState(false);

  const forgotPasswordFormSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await sendRequest(
      `${config.SERVER_URL}/api/auth/password/reset/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { email: emailInputRef.current.value },
      }
    );

    if (response.status >= 300) return setError(true);

    setError(false);
    onSubmit();
  };

  return (
    <>
      <LoginSignupModalHeader
        title="Forget Password"
        onBack={onBack}
        onClose={onClose}
      />
      <LoginSignupModalForm onSubmit={forgotPasswordFormSubmitHandler}>
        <LoginSignupModalContent>
          <Typography variant="modalSubtitle" color="textSecondary">
            Enter your email address and
            <br />
            we'll send you a reset link
          </Typography>
          <InputField
            id={"input-forgetPassword-email"}
            label="Email Address"
            type="email"
            inputRef={emailInputRef}
            className={classes.inputField}
          />
          <FormHelperText
            style={{ visibility: `${error ? "visible" : "hidden"}` }}
            error
          >
            There is no account in the system with the given email address.
          </FormHelperText>
        </LoginSignupModalContent>
        <LoginSignupModalActions>
          <Button
            className={classes["email-btn"]}
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

export default ForgotPasswordForm;
