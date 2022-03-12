import { Button } from "@mui/material";
import InputField from "../../UI/InputField/InputField";
import classes from "./SignupEmailForm.module.css";

const SignupEmailForm = ({ emailInputRef }) => {
  return (
    <form className={classes.emailform}>
      <InputField
        id="input-signup-email"
        label="Email address"
        type="email"
        size="small"
        inputRef={emailInputRef}
        required={true}
      />
      <Button variant="contained" color="secondary" size="medium">
        Check
      </Button>
    </form>
  );
};
export default SignupEmailForm;
