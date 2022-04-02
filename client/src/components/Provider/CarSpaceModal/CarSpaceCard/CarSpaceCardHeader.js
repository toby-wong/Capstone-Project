import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./CarSpaceCardHeader.module.css";

const CarSpaceCardHeader = ({ title, onClose, children }) => {
  return (
    <div className={classes.header}>
      <div className={classes["header-title"]}>
        <Typography
          variant="modalTitle"
          color="textSecondary"
          fontWeight="Bold"
        >
          {title}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      {children}
    </div>
  );
};

export default CarSpaceCardHeader;
