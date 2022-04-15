import classes from "./AddCarForm.module.css";

import * as utility from "../../../../utility";
import * as config from "../../../../config";

import { useContext, useReducer, useState } from "react";
import {
  addCarFormInitialState,
  addCarFormReducer,
} from "../../../../reducers/addcar-form-reducer";
import AccountModalContext from "../../../../contexts/account-modal-context";
import AuthContext from "../../../../contexts/auth-context";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import NumbersIcon from "@mui/icons-material/Numbers";
import { Button, CircularProgress, Icon } from "@mui/material";

import GeneralModalHeader from "../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../UI/GeneralModal/GeneralModalContent";
import InputField from "../../../UI/InputField/InputField";
import InputContainer from "../../../UI/InputContainer/InputContainer";
import GeneralModalActions from "../../../UI/GeneralModal/GeneralModalActions";
import MessageModal from "../../../UI/MessageModal/MessageModal";

const AddCarForm = () => {
  const authContext = useContext(AuthContext);
  const accountModalContext = useContext(AccountModalContext);
  const [formState, dispatchFormState] = useReducer(
    addCarFormReducer,
    addCarFormInitialState()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [subModal, setSubModal] = useState({
    isOpen: false,
    onClose: () => {},
    title: "",
    messages: [],
    actions: [],
  });

  const closeSubModalHandler = () => {
    setSubModal((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };
  const closeAllHandler = () => {
    closeSubModalHandler();
    accountModalContext.closeModal();
  };

  const manufacturerChangeHandler = (e) => {
    dispatchFormState({ type: "MANUFACTURER_INPUT", value: e.target.value });
  };
  const modelChangeHandler = (e) => {
    dispatchFormState({ type: "MODEL_INPUT", value: e.target.value });
  };
  const yearChangeHandler = (e) => {
    dispatchFormState({ type: "YEAR_INPUT", value: e.target.value });
  };
  const colourChangeHandler = (e) => {
    dispatchFormState({ type: "COLOUR_INPUT", value: e.target.value });
  };
  const registrationNumberChangeHandler = (e) => {
    dispatchFormState({
      type: "REGISTRATION_NUMBER_INPUT",
      value: e.target.value,
    });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("parkItAuthToken");
      if (!authToken) return;

      const formData = {
        user: authContext.userInfo.pk,
        carMake: formState.manufacturer.value,
        carModel: formState.model.value,
        carYear: formState.year.value,
        carColour: formState.colour.value,
        carRego: formState.registrationNumber.value,
      };

      const url = `${config.SERVER_URL}/api/consumer/vehicle`;
      const options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: formData,
      };
      const response = await utility.sendRequest(url, options, setIsLoading);

      if (!response.status) throw Error(config.NETWORK_ERROR_MESSAGE);
      if (response.status >= 300) {
        const errorMsgs = [];
        for (const key of Object.keys(response.data)) {
          errorMsgs.push(` - Not a valid ${key}.`);
        }
        throw Error(errorMsgs);
      }

      setSubModal({
        isOpen: true,
        onClose: closeAllHandler,
        title: "Success",
        messages: [
          "A car has been successfully registered under your account.",
        ],
        actions: [
          {
            color: "primary",
            onClick: closeAllHandler,
            content: "OK",
            width: "120px",
          },
        ],
      });

      accountModalContext.togglePageRefreshStatus();
    } catch (e) {
      setSubModal({
        isOpen: true,
        onClose: closeSubModalHandler,
        title: "Error",
        messages: e.message.split(","),
        actions: [
          {
            color: "primary",
            onClick: closeSubModalHandler,
            content: "OK",
            width: "120px",
          },
        ],
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <MessageModal
        open={subModal.isOpen}
        onClose={subModal.onClose}
        title={subModal.title}
        messages={subModal.messages}
        actions={subModal.actions}
      />
      <GeneralModalHeader
        title="Add Car"
        onClose={accountModalContext.closeModal}
      />
      <GeneralModalContent>
        <div className={classes.inputs}>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={WarehouseIcon} />
            <InputField
              inputClassName={classes.input}
              label="Manufacturer"
              type="text"
              name="manufacturer"
              value={formState.manufacturer.value}
              onChange={manufacturerChangeHandler}
            />
          </InputContainer>
          <InputContainer>
            <Icon
              variant="form"
              fontSize="large"
              component={DirectionsCarIcon}
            />
            <InputField
              inputClassName={classes.input}
              label="Model"
              type="text"
              name="model"
              value={formState.model.value}
              onChange={modelChangeHandler}
            />
          </InputContainer>
        </div>
        <div className={classes.inputs}>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={AccessTimeIcon} />
            <InputField
              inputClassName={classes.input}
              label="Year"
              type="number"
              name="year"
              value={formState.year.value}
              onChange={yearChangeHandler}
            />
          </InputContainer>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={ColorLensIcon} />
            <InputField
              inputClassName={classes.input}
              label="Colour"
              type="text"
              name="colour"
              value={formState.colour.value}
              onChange={colourChangeHandler}
            />
          </InputContainer>
        </div>
        <div className={classes.inputs}>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={NumbersIcon} />
            <InputField
              inputClassName={classes.input}
              label="Registration Number"
              type="number"
              name="registrationNumber"
              value={formState.registrationNumber.value}
              onChange={registrationNumberChangeHandler}
            />
          </InputContainer>
        </div>
      </GeneralModalContent>
      <GeneralModalActions>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!formState.isFormValid}
        >
          {isLoading ? <CircularProgress /> : "Register"}
        </Button>
      </GeneralModalActions>
    </form>
  );
};

export default AddCarForm;
