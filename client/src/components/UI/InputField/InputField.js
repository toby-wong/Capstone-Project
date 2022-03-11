import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  error = false,
  disabled = false,
}) => {
  return (
    <FormControl variant="outlined" error={error} disabled={disabled}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default InputField;

/*
<FormControl variant="outlined" error={false}>
            <InputLabel htmlFor="input-login-email">Email Address</InputLabel>
            <OutlinedInput
              id="input-login-email"
              label="Email Address"
              type="email"
              // value={value}
              // onChange={onChange}
            />
            <FormHelperText>Disabled</FormHelperText>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="input-login-password">Password</InputLabel>
            <OutlinedInput
              id="input-login-password"
              label="Password"
              type="password"
              // value={value}
              // onChange={onChange}
            />
            <FormHelperText>Disabled</FormHelperText>
*/
