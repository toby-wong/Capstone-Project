import { Button } from "@mui/material";
import InputField from "../../UI/InputField/InputField";
import classes from "./SignupPhoneForm.module.css";

const SignupPhoneForm = ({ phoneInputRef }) => {
  return (
    <form className={classes.phoneForm}>
      <InputField
        id="input-signup-phone"
        label="Phone number"
        type="tel"
        size="small"
        inputRef={phoneInputRef}
        required={true}
      />
      <Button variant="contained" color="secondary" size="medium">
        Check
      </Button>
    </form>
  );
};

export default SignupPhoneForm;
