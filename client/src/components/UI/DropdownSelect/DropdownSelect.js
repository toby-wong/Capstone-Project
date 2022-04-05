import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const DropdownSelect = ({
  labelId,
  selectId,
  label,
  value,
  onChange,
  helperText = "",
  className,
  items,
  selectClassName,
  selectMenuClassName,
  selectItemClassName,
  disabled = false,
}) => {
  return (
    <FormControl className={className}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        value={value}
        label={label}
        onChange={onChange}
        className={selectClassName}
        MenuProps={{
          PopoverClasses: {
            paper: selectMenuClassName,
          },
        }}
        disabled={disabled}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item} className={selectItemClassName}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default DropdownSelect;
