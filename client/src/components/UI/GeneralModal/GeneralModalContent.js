import classes from "./GeneralModalContent.module.css";

const GeneralModalContent = ({ children, className }) => {
  return <div className={`${classes.content} ${className}`}>{children}</div>;
};

export default GeneralModalContent;
