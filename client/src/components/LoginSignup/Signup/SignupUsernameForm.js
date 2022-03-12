import { Button, FormHelperText } from "@mui/material";
import InputField from "../../UI/InputField/InputField";
import classes from "./SignupUsernameForm.module.css";

const SignupUsernameForm = ({ usernameInputRef }) => {
  return (
    <form className={classes.usernameForm}>
      <InputField
        id="input-signup-username"
        label="Username"
        type="text"
        size="small"
        inputRef={usernameInputRef}
        required={true}
      />
      <Button type="submit" variant="contained" color="secondary" size="medium">
        Check
      </Button>
      <FormHelperText className={classes["form-helper-text"]}>
        - Username should be less than 20 characters
      </FormHelperText>
    </form>
  );
};

export default SignupUsernameForm;
