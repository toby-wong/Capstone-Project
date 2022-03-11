import { Button, Typography } from "@mui/material";

import InputField from "../../UI/InputField/InputField";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";

import classes from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = ({ emailInputRef }) => {
  return (
    <LoginSignupModalForm>
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
      </LoginSignupModalContent>
      <LoginSignupModalActions>
        <Button
          className={classes["email-btn"]}
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

export default ForgotPasswordForm;
