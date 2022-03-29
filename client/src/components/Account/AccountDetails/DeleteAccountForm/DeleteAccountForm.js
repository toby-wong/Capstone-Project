import classes from "./DeleteAccountForm.module.css";

import { Button, CircularProgress, FormHelperText } from "@mui/material";

import AccountDetailsFormCard from "../AccountDetailsCard/AccountDetailsCard";
import AccountDetailsCardActions from "../AccountDetailsCard/AccountDetailsCardActions";
import AccountDetailsCardHeader from "../AccountDetailsCard/AccountDetailsCardHeader";
import AccountDetailsCardContent from "../AccountDetailsCard/AccountDetailsCardContent";
import InputField from "../../../UI/InputField/InputField";

import { useState } from "react";

import { sendRequest } from "../../../../utility";
import * as config from "../../../../config";

const DeleteAccountForm = ({ setPage }) => {
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (deleteConfirm !== "delete") return setError(true);

    try {
      const authToken = localStorage.getItem("parkItAuthToken");
      const url = `${config.SERVER_URL}/api/delete/user`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
      };

      const response = await sendRequest(url, options, setIsLoading);

      if (!response.status || response.status >= 300) throw Error;

      localStorage.removeItem("parkItAuthToken");
      setPage("deleteAccountSuccess");
    } catch (e) {
      setPage("error");
    }
  };

  const deleteConfirmChangeHandler = (e) => {
    setError(false);
    setDeleteConfirm(e.target.value);
  };

  const cancelClickHandler = () => {
    setPage("details");
  };

  return (
    <AccountDetailsFormCard onSubmit={formSubmitHandler}>
      <AccountDetailsCardHeader>
        Do you really want to delete your account?
        <br />
        Please type "delete" if you want to proceed to delete.
      </AccountDetailsCardHeader>
      <AccountDetailsCardContent>
        <InputField
          className={classes.input}
          label={`Type in "delete"`}
          type="text"
          value={deleteConfirm}
          onChange={deleteConfirmChangeHandler}
          required={true}
          error={error}
        />
        <FormHelperText
          className={classes["helper-text"]}
          style={{ visibility: `${error ? "visible" : "hidden"}` }}
          error
        >
          * Typed text is not "delete"
        </FormHelperText>
      </AccountDetailsCardContent>
      <AccountDetailsCardActions>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={classes.btn}
        >
          {isLoading ? <CircularProgress size="1.5rem" /> : "OK"}
        </Button>
        <Button
          color="warning"
          variant="contained"
          size="large"
          className={`${classes.btn} ${classes["btn-cancel"]}`}
          onClick={cancelClickHandler}
        >
          Cancel
        </Button>
      </AccountDetailsCardActions>
    </AccountDetailsFormCard>
  );
};

export default DeleteAccountForm;
