import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const InputField = ({
  id,
  label,
  type,
  value,
  inputRef,
  onChange,
  onBlur,
  size = "large",
  error = false,
  disabled = false,
  required = false,
  className,
}) => {
  return (
    <FormControl
      variant="outlined"
      error={error}
      disabled={disabled}
      className={className}
      required={required}
      size={size}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={inputRef}
      />
    </FormControl>
  );
};

export default InputField;
