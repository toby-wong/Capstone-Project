import classes from "./CarSpaceFormSubModal.module.css";

import GeneralModal from "../../../../UI/GeneralModal/GeneralModal";
import GeneralModalHeader from "../../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../../UI/GeneralModal/GeneralModalContent";
import GeneralModalActions from "../../../../UI/GeneralModal/GeneralModalActions";

import { Button, Typography } from "@mui/material";

const CarSpaceFormSubModal = ({ open, onClose, title, content }) => {
  return (
    <GeneralModal open={open} onClose={onClose} className={classes.modal}>
      <GeneralModalHeader title={title} onClose={onClose} />
      <GeneralModalContent className={classes.content}>
        {content.map((message) => {
          return (
            <Typography
              key={message}
              variant="modalContent"
              className={classes["content-item"]}
            >
              {message}
            </Typography>
          );
        })}
      </GeneralModalContent>
      <GeneralModalActions>
        <Button
          size="large"
          variant="contained"
          className={classes.btn}
          onClick={onClose}
        >
          OK
        </Button>
      </GeneralModalActions>
    </GeneralModal>
  );
};

export default CarSpaceFormSubModal;
