import { useState } from "react";

import classes from "./ChangeEmailForm.module.css";

import { Button, CircularProgress, FormHelperText } from "@mui/material";

import InputField from "../../../UI/InputField/InputField";
import AccountDetailsFormCard from "../AccountDetailsCard/AccountDetailsCard";
import AccountDetailsCardActions from "../AccountDetailsCard/AccountDetailsCardActions";
import AccountDetailsCardContent from "../AccountDetailsCard/AccountDetailsCardContent";
import AccountDetailsCardHeader from "../AccountDetailsCard/AccountDetailsCardHeader";

import { sendRequest } from "../../../../utility";
import * as config from "../../../../config";

const ChangeEmailForm = ({ setPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const emailChangeHandler = (e) => {
    if (error) setError(false);
    setEmail(e.target.value);
  };

  const cancelClickHandler = () => {
    setPage("details");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // TODO: Waiting for Backend Endpoint to be finalized to be fully functional
    try {
      // const authToken = localStorage.getItem("parkItAuthToken");
      // const url = `${config.SERVER_URL}`;
      // const options = {
      //   method: "POST",
      //   headers: {
      //     Authorization: "Bearer " + authToken,
      //     "Content-Type": "application/json",
      //   },
      //   body: { email },
      // };

      // const response = await sendRequest(url, options, setIsLoading);

      // if (!response.status) throw Error;
      // if (response.status >= 300) setError(true);
      // else setPage("emailUpdateSuccess");
      setPage("emailUpdateSuccess");
    } catch (e) {
      setPage("error");
    }
  };

  return (
    <AccountDetailsFormCard onSubmit={formSubmitHandler}>
      <AccountDetailsCardHeader>
        Please enter your new email address
      </AccountDetailsCardHeader>
      <AccountDetailsCardContent>
        <InputField
          className={classes.input}
          label="New Email"
          type="email"
          name="email"
          value={email}
          onChange={emailChangeHandler}
          required={true}
        />
        <FormHelperText
          className={classes["helper-text"]}
          style={{ visibility: `${error ? "visible" : "hidden"}` }}
          error
        >
          * The email is already in use.
        </FormHelperText>
      </AccountDetailsCardContent>
      <AccountDetailsCardActions>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={classes.btn}
        >
          {isLoading ? <CircularProgress size="1.5rem" /> : "Change"}
        </Button>
        <Button
          variant="contained"
          size="large"
          color="warning"
          onClick={cancelClickHandler}
          className={`${classes.btn} ${classes["btn-cancel"]}`}
        >
          Cancel
        </Button>
      </AccountDetailsCardActions>
    </AccountDetailsFormCard>
  );
};

export default ChangeEmailForm;
