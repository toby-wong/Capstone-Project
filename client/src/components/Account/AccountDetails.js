import { Button, Paper, Typography } from "@mui/material";
import classes from "./AccountDetails.module.css";

const AccountDetails = () => {
  return (
    <>
      <Typography variant="sectionTitle">Account Details</Typography>
      <Paper elevation={0} className={classes.body}>
        <div className={classes.row}>
          <div className={classes.col}>
            <p className={classes.label}>Username</p>
            <p className={classes.value}>TomTak#123</p>
          </div>
          <div className={classes["col-horizontal"]}>
            <div className={classes.col__row}>
              <p className={classes.label}>Firstname</p>
              <p className={classes.value}>Younggil</p>
            </div>
            <div className={classes.col__row}>
              <p className={classes.label}>Lastname</p>
              <p className={classes.value}>Tak</p>
            </div>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <p className={classes.label}>Phone number</p>
            <p className={classes.value}>0431 524 895</p>
          </div>
          <div className={classes.col}>
            <p className={classes.label}>Email Address</p>
            <p className={classes.value}>y0unggil0919@gmail.com</p>
          </div>
        </div>
        <div className={classes.row}>
          <Button variant="contained" size="small">
            Reset Password
          </Button>
          <Button variant="contained" color="warning" size="small">
            Delete Account
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default AccountDetails;
