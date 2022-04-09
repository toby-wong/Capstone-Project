import classes from "./CarSpaceEditForm.module.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { Button, CircularProgress, Typography } from "@mui/material";

import CarSpaceFormSubModal from "../CarSpaceForm/CarSpaceFormSubModal/CarSpaceFormSubModal";
import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import InputField from "../../../UI/InputField/InputField";
import DropdownSelect from "../../../UI/DropdownSelect/DropdownSelect";

import * as config from "../../../../config";
import * as utility from "../../../../utility";

import { useContext, useEffect, useReducer, useState } from "react";

import CarSpaceFormImageCarousel from "../CarSpaceForm/CarSpaceFormImageCarousel/CarSpaceFormImageCarousel";
import AuthContext from "../../../../contexts/auth-context";
import CarSpaceModalContext from "../../../../contexts/carspace-modal-context";
import {
  carSpaceEditFormReducer,
  getCarSpaceEditFormInitialState,
} from "../../../../reducers/carspace-edit-form-reducer";

const CarSpaceEditForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subModal, setSubModal] = useState({
    isOpen: false,
    onClose: () => {},
    title: "",
    content: [],
  });
  const [formState, dispatchFormState] = useReducer(
    carSpaceEditFormReducer,
    getCarSpaceEditFormInitialState()
  );
  const authContext = useContext(AuthContext);
  const carSpaceModalContext = useContext(CarSpaceModalContext);

  useEffect(() => {
    dispatchFormState({
      type: "FETCH",
      value: carSpaceModalContext.carSpaceInfo,
    });
  }, [carSpaceModalContext.carSpaceInfo]);

  // Image Upload Handlers
  const imageUploadHandler = async (e) => {
    const images = Array.from(e.target.files);
    const base64Images = await utility.convertImagesToBase64(images);

    dispatchFormState({ type: "IMAGES_INPUT", value: base64Images });
  };

  const imageDeleteHandler = (e) => {
    const targetImageNum = e.target.dataset.imagenum;
    formState.images.value.splice(targetImageNum, 1);

    dispatchFormState({ type: "IMAGES_INPUT", value: formState.images.value });
  };

  // Price/Vehicle Size/Notes Handler
  const priceChangeHandler = (e) => {
    dispatchFormState({ type: "PRICE_INPUT", value: e.target.value });
  };

  const maxVehicleSizeChangeHandler = (e) => {
    dispatchFormState({
      type: "MAX_VEHICLE_SIZE_INPUT",
      value: e.target.value,
    });
  };

  const notesChangeHandler = (e) => {
    dispatchFormState({ type: "NOTES_INPUT", value: e.target.value });
  };

  // Form Submission
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("parkItAuthToken");
      if (!authToken) return;

      const formData = {
        provider: authContext.userInfo.pk,
        startTime: utility.getDate(formState.startDateTime),
        endTime: utility.getDate(formState.endDateTime),
        streetAddress: formState.streetAddress,
        city: formState.city,
        state: formState.state,
        postcode: formState.postcode,
        price: formState.price.value,
        size: formState.maxVehicleSize.value,
        images: formState.images.value,
        notes: formState.notes.value,
      };
      console.log(formData);
      const carSpaceRegistrationUrl = `${config.SERVER_URL}/api/provider/parking/${carSpaceModalContext.carSpaceId}`;
      const carSpaceRegistrationOptions = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: formData,
      };
      const carSpaceRegistrationResponse = await utility.sendRequest(
        carSpaceRegistrationUrl,
        carSpaceRegistrationOptions,
        setIsLoading
      );

      if (!carSpaceRegistrationResponse.status)
        throw Error(config.NETWORK_ERROR_MESSAGE);
      if (carSpaceRegistrationResponse.status >= 300) {
        const errorMsgs = [];
        for (const key of Object.keys(carSpaceRegistrationResponse.data)) {
          errorMsgs.push(` - Not a valid ${key}.`);
        }
        throw Error(errorMsgs);
      }

      setSubModal({
        isOpen: true,
        onClose: closeAllHandler,
        title: "Success",
        content: ["Your space has been successfully registered"],
      });
    } catch (e) {
      setSubModal({
        isOpen: true,
        onClose: closeSubModalHandler,
        title: "Error",
        content: e.message.split(","),
      });
    }
  };

  // CloseSubModal handlers
  const closeSubModalHandler = () => {
    setSubModal((prev) => {
      return { ...prev, isOpen: false };
    });
  };
  const closeAllHandler = () => {
    setSubModal((prev) => {
      return { ...prev, isOpen: false };
    });
    carSpaceModalContext.closeModal();
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      <CarSpaceFormSubModal
        open={subModal.isOpen}
        onClose={subModal.onClose}
        title={subModal.title}
        content={subModal.content}
      />
      <CarSpaceCardHeader
        title={"Edit Car Space"}
        onClose={carSpaceModalContext.closeModal}
      />
      <CarSpaceCardContent>
        <CarSpaceCardContentLeft>
          <div className={classes["image-upload-container"]}>
            <CarSpaceFormImageCarousel
              images={formState.images.value.map((imgObj) => imgObj.image_data)}
              onDeleteImage={imageDeleteHandler}
            />
            <div className={classes["image-uploader"]}>
              <InputField
                type="file"
                onChange={imageUploadHandler}
                multiple={true}
              />
            </div>
          </div>
          <div className={classes.actions}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={!formState.isFormValid}
            >
              {isLoading ? <CircularProgress size="1.5rem" /> : "Edit"}
            </Button>
          </div>
        </CarSpaceCardContentLeft>
        <CarSpaceCardContentRight>
          <div className={classes.details}>
            <div className={classes.details__item}>
              <AccessTimeIcon className={classes.icon} fontSize="large" />
              <div className={classes.details__item__content}>
                <Typography variant="carSpaceModalSubTitle">
                  Available Dates
                </Typography>
                <Typography variant="carSpaceModalContent">
                  {`${formState.startDateTime} ~ ${formState.endDateTime}`}
                </Typography>
              </div>
            </div>
            <div className={classes.details__item}>
              <BusinessIcon className={classes.icon} fontSize="large" />
              <div className={classes.details__item__content}>
                <Typography variant="carSpaceModalSubTitle">ADDRESS</Typography>
                <Typography variant="carSpaceModalContent">
                  {`${formState.streetAddress}, ${formState.city}, ${formState.state}, ${formState.postcode}`}
                </Typography>
              </div>
            </div>
            <div className={classes.details__item}>
              <AttachMoneyIcon
                className={classes.icon}
                fontSize="large"
                color="yellow"
              />
              <InputField
                className={classes.input}
                inputClassName={classes.input}
                label="Price (Hourly rate)"
                type="number"
                name="price"
                value={formState.price.value}
                onChange={priceChangeHandler}
              />
            </div>
            <div className={classes.details__item}>
              <DirectionsCarIcon className={classes.icon} fontSize="large" />
              <DropdownSelect
                className={`${classes.input} ${classes.field}`}
                selectClassName={classes.input}
                selectMenuClassName={classes["select-menu"]}
                selectItemClassName={classes["select-item"]}
                labelId="maxVehicleSizeLabelId"
                selectId="maxVehicleSizeSelectId"
                label="Max Vehicle Size"
                value={formState.maxVehicleSize.value}
                onChange={maxVehicleSizeChangeHandler}
                items={config.VEHICLE_TYPES}
              />
            </div>
            <div className={classes.notes}>
              <StickyNote2Icon className={classes.icon} fontSize="large" />
              <InputField
                className={classes.input}
                label="Notes"
                type="text"
                name="notes"
                multiline={true}
                maxRows={3}
                minRows={3}
                value={formState.notes.value}
                onChange={notesChangeHandler}
                placeholder={`Please type N/A if nothing to type here.`}
              />
            </div>
          </div>
        </CarSpaceCardContentRight>
      </CarSpaceCardContent>
    </form>
  );
};

export default CarSpaceEditForm;
