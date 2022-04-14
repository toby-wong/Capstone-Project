import classes from "./InputContainer.module.css";

const InputContainer = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default InputContainer;
