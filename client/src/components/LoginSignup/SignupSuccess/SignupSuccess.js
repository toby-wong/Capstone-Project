import { Button } from "@mui/material";
import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalHeader from "../LoginSignupModal/LoginSignupModalHeader";
import classes from "./SignupSuccess.module.css";

const SignupSuccess = ({ onClose }) => {
  return (
    <>
      <LoginSignupModalHeader title="Thank you" onClose={onClose} />
      <LoginSignupModalContent className={classes.content}>
        <p>
          Your signup request has been successfully sent to our server. Please
          check a verification email sent to the email you registered for the
          account.
        </p>
        <p>
          It normally take 3 ~ 5 business days until the account registration
          after the date you've verify your account.
        </p>
      </LoginSignupModalContent>
      <LoginSignupModalActions>
        <Button
          size="large"
          variant="contained"
          className={classes["confirm-btn"]}
          onClick={onClose}
        >
          OK
        </Button>
      </LoginSignupModalActions>
    </>
  );
};

export default SignupSuccess;
