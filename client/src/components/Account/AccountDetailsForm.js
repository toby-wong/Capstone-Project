import { Button, InputLabel } from "@mui/material";
import { useEffect, useReducer } from "react";
import {
  detailsformStateReducer,
  getDetailsformInitialState,
} from "../../reducers/detailsform-reducer";
import AccountDetailsEntry from "./AccountDetailsEntry";
import classes from "./AccountDetailsForm.module.css";
import AccountDetailsFormInput from "./AccountDetailsFormInput";

const AccountDetailsForm = ({ details, onSubmit }) => {
  const [formState, dispatchForm] = useReducer(
    detailsformStateReducer,
    getDetailsformInitialState()
  );

  useEffect(() => {
    dispatchForm({ type: "FETCH", value: details });
  }, [details]);

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.row}>
        <div className={classes["col-horizontal"]}>
          <AccountDetailsEntry label={"Username"} value={details.username} />
          <div className={classes.col}>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              size="small"
            >
              Change Password
            </Button>
          </div>
        </div>
        <div className={classes["col-horizontal"]}>
          <AccountDetailsEntry label={"Firstname"} value={details.first_name} />
          <AccountDetailsEntry label={"Lastname"} value={details.last_name} />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes["col-horizontal"]}>
          <AccountDetailsEntry label={"Email Address"} value={details.email} />
          <div className={classes.col}>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              size="small"
            >
              Change Email
            </Button>
          </div>
        </div>
        <div className={classes["col-horizontal"]}>
          <AccountDetailsFormInput
            id={"phone"}
            name={"phone_number"}
            label={"Phone number"}
            type={"text"}
            value={formState.phoneNumber.value}
            isValid={formState.phoneNumber.isValid}
            validCondition={"* 10 digits"}
            onChange={(e) =>
              dispatchForm({ type: "PHONENUMBER_INPUT", value: e.target.value })
            }
          />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.col}>
          <InputLabel className={classes.label}>
            Bank Account Details
          </InputLabel>
          <div className={classes["col-horizontal"]}>
            <AccountDetailsFormInput
              id={"accountName"}
              name={"account_name"}
              label={"Account Name"}
              type={"text"}
              value={formState.accountName.value}
              isValid={formState.accountName.isValid}
              validCondition={"* alphabets and spaces"}
              onChange={(e) =>
                dispatchForm({
                  type: "ACCOUNTNAME_INPUT",
                  value: e.target.value,
                })
              }
            />
            <AccountDetailsFormInput
              id={"bsb"}
              name={"bsb"}
              label={"BSB"}
              type={"text"}
              value={formState.bsb.value}
              isValid={formState.bsb.isValid}
              validCondition={"* 6 digits"}
              onChange={(e) =>
                dispatchForm({ type: "BSB_INPUT", value: e.target.value })
              }
              componentsProps={{ input: { minLength: 6, maxLength: 6 } }}
            />
            <AccountDetailsFormInput
              id={"accountNumber"}
              name={"account_number"}
              label={"Account Number"}
              type={"text"}
              value={formState.accountNumber.value}
              isValid={formState.accountNumber.isValid}
              validCondition={"* 9 digits"}
              onChange={(e) =>
                dispatchForm({
                  type: "ACCOUNTNUMBER_INPUT",
                  value: e.target.value,
                })
              }
              componentsProps={{ input: { minLength: 9, maxLength: 9 } }}
            />
          </div>
        </div>
        <div className={classes.col}>
          <InputLabel className={classes.label}>Payment Details</InputLabel>
          <div className={classes["col-horizontal"]}>
            <AccountDetailsFormInput
              id={"cardNumber"}
              name={"card_number"}
              label={"Card Number"}
              type={"text"}
              value={formState.cardNumber.value}
              isValid={formState.cardNumber.isValid}
              validCondition={"* 16 digits"}
              onChange={(e) =>
                dispatchForm({
                  type: "CARDNUMBER_INPUT",
                  value: e.target.value,
                })
              }
              componentsProps={{ input: { minLength: 16, maxLength: 16 } }}
            />
            <div className={classes["col-horizontal"]}>
              <AccountDetailsFormInput
                id={"month"}
                name={"expiry_date"}
                label={"Expiry Date"}
                type={"string"}
                placeholder={"MM/YY"}
                value={formState.expiryDate.value}
                isValid={formState.expiryDate.isValid}
                validCondition={"* MM/YY"}
                onChange={(e) =>
                  dispatchForm({
                    type: "EXPIRYDATE_INPUT",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <AccountDetailsFormInput
              id={"cvc"}
              name={"cvc"}
              label={"CVC"}
              type={"password"}
              value={formState.cvc.value}
              isValid={formState.cvc.isValid}
              validCondition={"* 3 digits"}
              onChange={(e) =>
                dispatchForm({ type: "CVC_INPUT", value: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className={`${classes["last-row"]}`}>
        <Button
          className={classes.button}
          color="error"
          variant="contained"
          size="small"
        >
          Delete Account
        </Button>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="small"
          type="submit"
          disabled={!formState.isFormValid}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default AccountDetailsForm;
