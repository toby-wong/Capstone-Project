import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const InputField = ({
  id,
  label,
  type,
  value,
  inputRef,
  onChange,
  error = false,
  disabled = false,
  className,
}) => {
  return (
    <FormControl
      variant="outlined"
      error={error}
      disabled={disabled}
      className={className}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        inputRef={inputRef}
      />
    </FormControl>
  );
};

export default InputField;
