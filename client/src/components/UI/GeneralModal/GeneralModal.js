import { Modal, Paper } from "@mui/material";

const GeneralModal = ({
  open,
  onClose,
  height,
  width,
  flexDirection,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        style={{
          height: height,
          width: width,
          flexDirection: flexDirection,
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
};

export default GeneralModal;
