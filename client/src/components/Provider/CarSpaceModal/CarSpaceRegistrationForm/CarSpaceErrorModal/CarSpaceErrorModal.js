import classes from "./CarSpaceErrorModal.module.css";

import GeneralModal from "../../../../UI/GeneralModal/GeneralModal";
import GeneralModalHeader from "../../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../../UI/GeneralModal/GeneralModalContent";
import GeneralModalActions from "../../../../UI/GeneralModal/GeneralModalActions";

import { Button, Typography } from "@mui/material";

const CarSpaceErrorModal = ({ open, onClose, message }) => {
  return (
    <GeneralModal open={open} onClose={onClose} className={classes.modal}>
      <GeneralModalHeader title={"Input Error"} onClose={onClose} />
      <GeneralModalContent>
        <Typography variant="modalContent">{message}</Typography>
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

export default CarSpaceErrorModal;
