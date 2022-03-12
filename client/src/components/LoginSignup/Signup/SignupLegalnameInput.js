import InputField from "../../UI/InputField/InputField";
import classes from "./SignupLegalnameInput.module.css";

const SignupLegalnameInput = ({ firstnameInputRef, lastnameInputRef }) => {
  return (
    <div className={classes.legalnameInput}>
      <InputField
        id="input-signup-firstname"
        label="First name"
        type="text"
        size="small"
        inputRef={firstnameInputRef}
        required={true}
      />
      <InputField
        id="input-signup-lastname"
        label="Last name"
        type="text"
        size="small"
        inputRef={lastnameInputRef}
        required={true}
      />
    </div>
  );
};

export default SignupLegalnameInput;
