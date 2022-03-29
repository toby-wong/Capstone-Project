import { Button, CircularProgress, FormHelperText } from "@mui/material";
import { useState } from "react";

import InputField from "../../../UI/InputField/InputField";

import classes from "./AccountDetailsAuthForm.module.css";

import { sendRequest } from "../../../../utility";
import * as config from "../../../../config";
import AccountDetailsFormCard from "../AccountDetailsCard/AccountDetailsCard";
import AccountDetailsCardHeader from "../AccountDetailsCard/AccountDetailsCardHeader";
import AccountDetailsCardContent from "../AccountDetailsCard/AccountDetailsCardContent";
import AccountDetailsCardActions from "../AccountDetailsCard/AccountDetailsCardActions";

const AccountDetailsAuthForm = ({ setPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const authFormSubmitHandler = async (e) => {
    e.preventDefault();

    const password = new FormData(e.target).get("password");
    const formData = {
      email: "y0unggil0919@gmail.com",
      password,
    };
    // TODO: NEED TO BE FIXED ONCE BACKEND ENDPOINT IS READY
    try {
      // const authToken = localStorage.getItem("parkItAuthToken");
      const url = `${config.SERVER_URL}/api/auth/login/`;
      // const url = `${config.SERVER_URL}/api`;
      const options = {
        method: "POST",
        headers: {
          // Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: formData,
        // body: {password: new FormData(e.target).get("password")},
      };
      const response = await sendRequest(url, options, setIsLoading);

      if (!response.status) throw Error;

      if (response.status >= 300) setError(true);
      else setPage("details");
    } catch (e) {
      setPage("error");
    }
  };

  return (
    <AccountDetailsFormCard onSubmit={authFormSubmitHandler}>
      <AccountDetailsCardHeader>
        Please enter your password again
      </AccountDetailsCardHeader>
      <AccountDetailsCardContent>
        <InputField
          className={classes.input}
          label="Password"
          type="password"
          name="password"
        />
        <FormHelperText
          style={{ visibility: `${error ? "visible" : "hidden"}` }}
          error
        >
          * Password is incorrect
        </FormHelperText>
      </AccountDetailsCardContent>
      <AccountDetailsCardActions>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={classes.btn}
        >
          {isLoading ? <CircularProgress size="1.5rem" /> : "Authenticate"}
        </Button>
      </AccountDetailsCardActions>
    </AccountDetailsFormCard>
  );
};

export default AccountDetailsAuthForm;
