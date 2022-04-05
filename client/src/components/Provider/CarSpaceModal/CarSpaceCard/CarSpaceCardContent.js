import classes from "./CarSpaceCardContent.module.css";

const CarSpaceCardContent = ({ children }) => {
  return <div className={classes.body}>{children}</div>;
};

export default CarSpaceCardContent;
