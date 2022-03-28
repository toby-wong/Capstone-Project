import { CircularProgress, Paper, Typography } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import * as config from "../../config";

import classes from "./AccountDetails.module.css";
import AccountDetailsForm from "./AccountDetailsForm";
import AuthContext from "../../contexts/auth-context";
/*
  0. Error message box showing in case of failing to update or failing to fetch
  1. Create Modal for change password/change email/delete account
*/
const AccountDetails = () => {
  const [isLoading, sendRequest] = useHttp();
  const [details, setDetails] = useState({
    username: "",
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      let initialToken = localStorage.getItem("parkItAuthToken");
      if (!initialToken) return;

      const response = await sendRequest(
        `${config.SERVER_URL}/api/auth/user/`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + initialToken,
          },
        }
      );

      if (response.status >= 300) return;

      setDetails(response.data);
    };

    fetchData();
  }, []);

  const detailsUpdateHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const formData = {};

    for (const [key, value] of form.entries()) {
      if (value === "") continue;
      formData[key] = value;
    }

    const initialToken = localStorage.getItem("parkItAuthToken");
    const url = `${config.SERVER_URL}/api/auth/user/`;
    const options = {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + initialToken,
        "Content-Type": "application/json",
      },
      body: formData,
    };

    const response = await sendRequest(url, options);

    if (response.status >= 300) return;
  };

  // prettier-ignore
  return (
    <>
      <Typography variant="sectionTitle">Account Details</Typography>
      <Paper elevation={0} className={classes.body}>
        {isLoading && (<div><CircularProgress className={classes.spinner} /></div>)}
        {!isLoading && <AccountDetailsForm details={details} onSubmit={detailsUpdateHandler}/>}
      </Paper>
    </>
  );
};

export default AccountDetails;
