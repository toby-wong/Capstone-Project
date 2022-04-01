import { Button } from "@mui/material";

import AccountDetailsFormCard from "../AccountDetailsCard/AccountDetailsCard";
import AccountDetailsCardActions from "../AccountDetailsCard/AccountDetailsCardActions";
import AccountDetailsCardHeader from "../AccountDetailsCard/AccountDetailsCardHeader";

import classes from "./EmailUpdateSuccess.module.css";

const EmailUpdateSuccess = ({ setPage }) => {
  const clickHandler = () => {
    setPage("details");
  };
  return (
    <AccountDetailsFormCard>
      <AccountDetailsCardHeader>
        Please check the verification email sent to your new email.
        <br />
        Your email will be updated once you check the email.
      </AccountDetailsCardHeader>
      <AccountDetailsCardActions>
        <Button
          variant="contained"
          size="large"
          className={classes.btn}
          onClick={clickHandler}
        >
          OK
        </Button>
      </AccountDetailsCardActions>
    </AccountDetailsFormCard>
  );
};

export default EmailUpdateSuccess;
