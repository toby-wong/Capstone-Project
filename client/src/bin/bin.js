import { Button, FormHelperText } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import InputField from "../../UI/InputField/InputField";
import classes from "./SignupUsernameForm.module.css";

const URL = "https://localhost:3000";

const SignupUsernameForm = ({ usernameInputRef }) => {
  const [isValid, setIsValid] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [isBeingChecked, setIsBeingChekced] = useState(false);

  const checkValidity = () => {
    const enteredUsername = usernameInputRef.current.value;
    if (enteredUsername.length === 0) setDisabled(true);
    else if (enteredUsername.length > 20) {
      setIsValid(false);
      setDisabled(true);
    } else {
      setIsValid(true);
      setDisabled(false);
    }
  };

  const checkDuplicate = () => {
    setIsBeingChekced(true);
  };

  return (
    <div className={classes.usernameForm}>
      <InputField
        id="input-signup-username"
        label="Username"
        type="text"
        size="small"
        inputRef={usernameInputRef}
        onChange={checkValidity}
        required={true}
        error={!isValid}
        disabled={isBeingChecked}
      />
      <Button
        variant="contained"
        color="secondary"
        size="medium"
        disabled={disabled}
        onClick={checkDuplicate}
      >
        {isBeingChecked && <CircularProgress color="container" size={20} />}
        {!isBeingChecked && "Check"}
      </Button>
      <FormHelperText className={classes["form-helper-text"]} error={!isValid}>
        - Username should be less than 20 characters
      </FormHelperText>
    </div>
  );
};

export default SignupUsernameForm;
