import { Button } from "@mui/material";

import LoginSignupModalActions from "../LoginSignupModal/LoginSignupModalActions";
import LoginSignupModalContent from "../LoginSignupModal/LoginSignupModalContent";
import LoginSignupModalForm from "../LoginSignupModal/LoginSignupModalForm";

import classes from "./SignupForm.module.css";

const SignupForm = ({ onSubmit }) => {
  return (
    <LoginSignupModalForm onSubmit={onSubmit}>
      <LoginSignupModalContent>Content</LoginSignupModalContent>
      <LoginSignupModalActions>
        <Button variant="contained" size="large" type="submit">
          Sign up
        </Button>
        <Button variant="contained" size="large">
          Cancel
        </Button>
      </LoginSignupModalActions>
    </LoginSignupModalForm>
  );
};

export default SignupForm;
