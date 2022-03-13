import InputField from "../../UI/InputField/InputField";

import classes from "./SignupAdminCodeInput.module.css";

const SignupAdminCodeInput = ({ state, onChange }) => {
  const adminCodeChangeHandler = (e) => {
    onChange({ type: "ADMINCODE_INPUT", value: e.target.value });
  };

  return (
    <div className={classes["signup-admincode-input"]}>
      <InputField
        id="input-signup-adminCode"
        label="Admin Code"
        type="text"
        size="small"
        value={state.value}
        onChange={adminCodeChangeHandler}
      />
    </div>
  );
};

export default SignupAdminCodeInput;
