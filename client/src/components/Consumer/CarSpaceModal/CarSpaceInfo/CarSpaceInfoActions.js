import { Button } from "@mui/material";
import classes from "./CarSpaceInfoActions.module.css";

const CarSpaceInfoActions = ({ actions }) => {
  return (
    <div className={classes.actions}>
      {actions.map((action) => (
        <Button
          key={action.content}
          variant="contained"
          size="large"
          onClick={action.onClick}
          color={action.color}
        >
          {action.content}
        </Button>
      ))}
    </div>
  );
};

export default CarSpaceInfoActions;
