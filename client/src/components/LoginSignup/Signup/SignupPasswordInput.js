import { FormHelperText } from "@mui/material";
import { useRef } from "react";
import InputField from "../../UI/InputField/InputField";
import classes from "./SignupPasswordInput.module.css";

const SignupPasswordInput = ({ passwordInputRef }) => {
  const confirmPasswordInputRef = useRef();

  return (
    <div className={classes.signupPasswordInput}>
      <div className={classes.password}>
        <InputField
          id="input-signup-password"
          label="Password"
          type="password"
          size="small"
          inputRef={passwordInputRef}
          required={true}
        />
        <FormHelperText className={classes["password-helper-text"]}>
          - Password should be between 8 and 32 characters
          <br />
          - Password should contain at least one lowercase
          <br />
          - Password should contain at least one uppercase
          <br />- Password should contain at least one digit
        </FormHelperText>
      </div>
      <div className={classes.confirmPassword}>
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
  );
};

export default SignupPasswordInput;
