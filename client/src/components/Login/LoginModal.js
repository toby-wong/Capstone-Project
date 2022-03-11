import classes from "./LoginModal.module.css";

import InputField from "../UI/InputField/InputField";

import { Button, Link, Modal, Paper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = ({ open, onClose }) => {
  return (
    <Modal className={classes.backdrop} open={open} onClose={onClose}>
      <Paper className={classes.overlay}>
        <div className={classes.overlay__top}>
          <Typography variant="title" color="textSecondary" fontWeight="Bold">
            Log in
          </Typography>
          <IconButton size="large" onClick={onClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={classes.overlay__mid}>
          <InputField
            id="input-login-email"
            label="Email Address"
            type="email"
          />
          <InputField
            id="input-login-password"
            label="Password"
            type="password"
          />
        </div>
        <div className={classes.overlay__btm}>
          <div className={classes.links}>
            <Link color="textSecondary" href="/signup">
              New user? Sign up here
            </Link>
            <Link color="textSecondary" href="/forgotPassword">
              Forgot Password
            </Link>
          </div>
          <Button
            className={classes["login-btn"]}
            variant="contained"
            size="large"
          >
            Continue
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default LoginModal;
