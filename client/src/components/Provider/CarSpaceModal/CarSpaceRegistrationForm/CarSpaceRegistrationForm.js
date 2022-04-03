import classes from "./CarSpaceRegistrationForm.module.css";

import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, CircularProgress } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import CarSpaceErrorModal from "./CarSpaceErrorModal/CarSpaceErrorModal";
import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import InputField from "../../../UI/InputField/InputField";
import DropdownSelect from "../../../UI/DropdownSelect/DropdownSelect";

import * as config from "../../../../config";
import * as utility from "../../../../utility";

import { useEffect, useReducer, useState } from "react";
import {
  carSpaceFormReducer,
  getCarSpaceFormInitialState,
} from "../../../../reducers/carSpaceForm-reducer";

const CarSpaceRegistrationForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ value: false, message: [] });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [isDeleteIconVisible, setIsDeleteIconVisible] = useState("hidden");
  const [formState, dispatchFormState] = useReducer(
    carSpaceFormReducer,
    getCarSpaceFormInitialState()
  );

  useEffect(() => {
    const newUploadedImageUrls = [];
    uploadedImages.forEach((image) =>
      newUploadedImageUrls.push(URL.createObjectURL(image))
    );
    setUploadedImageUrls(newUploadedImageUrls);
  }, [uploadedImages]);

  // Image Upload Handlers
  const imageUploadHandler = (e) => {
    setUploadedImages([...e.target.files]);
  };

  const uploadedImageMouseEnterHandler = (e) => {
    setIsDeleteIconVisible("visible");
  };

  const uploadedImageMouseLeaveHandler = (e) => {
    setIsDeleteIconVisible("hidden");
  };

  const imageDeleteHandler = (e) => {
    const targetImageNum = e.target.dataset.imagenum;
    uploadedImages.splice(targetImageNum, 1);
    setUploadedImages([...uploadedImages]);
  };

  // Address Handlers
  const streetAddressChangeHandler = (e) => {
    dispatchFormState({ type: "STREET_ADDRESS_INPUT", value: e.target.value });
  };

  const cityChangeHandler = (e) => {
    dispatchFormState({ type: "CITY_INPUT", value: e.target.value });
  };

  const stateChangeHandler = (e) => {
    dispatchFormState({ type: "STATE_INPUT", value: e.target.value });
  };

  const postCodeChangeHandler = (e) => {
    dispatchFormState({ type: "POSTCODE_INPUT", value: e.target.value });
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
      // Base64 Encoding for images
      const imagesInBase64 = await utility.convertImagesToBase64(
        e.target.files
      );

      // Get username
      const authToken = localStorage.getItem("parkItAuthToken");
      if (!authToken) return;

      const getUserDataUrl = `${config.SERVER_URL}/api/auth/user/`;
      const getUserDataoptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };

      // Send Car Space Registration Data to Backend
      setIsLoading(true);
      const getUserDataResponse = await utility.sendRequest(
        getUserDataUrl,
        getUserDataoptions
      );

      if (!getUserDataResponse.status)
        throw Error(`Network Error: Check your internet connection and try again.
          If this keeps happening, please contact our office.
        `);
      if (getUserDataResponse.status >= 300)
        throw Error(getUserDataResponse.data);

      const carSpaceRegistrationUrl = `${config.SERVER_URL}/api/provider/add/parking`;
      const carSpaceRegistrationOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json",
        },
        body: {
          provider: getUserDataResponse.data.username,
          streetAddress: formState.streetAddress,
          city: formState.city,
          state: formState.state,
          postcode: formState.postcode,
          price: formState.price,
          maxVehicleSize: formState.maxVehicleSize,
          images: imagesInBase64,
          notes: formState.notes,
        },
      };
      const carSpaceRegistrationResponse = await utility.sendRequest(
        carSpaceRegistrationUrl,
        carSpaceRegistrationOptions
      );
      setIsLoading(false);

      if (!carSpaceRegistrationResponse.status)
        throw Error(`Network Error: Check your internet connection and try again.
          If this keeps happening, please contact our office.
        `);
      if (carSpaceRegistrationResponse.status >= 300)
        throw Error(carSpaceRegistrationResponse.data);
    } catch (e) {
      console.log(e.message);
      setError({ value: true, message: e.message });
    }
  };

  const errorModalCloseHandler = () => {};
  return (
    <form onSubmit={formSubmitHandler}>
      <CarSpaceErrorModal
        open={error.value}
        onClose={errorModalCloseHandler}
        message={error.message}
      />
      <CarSpaceCardHeader title={"Car space registration"} onClose={onClose} />
      <CarSpaceCardContent>
        <CarSpaceCardContentLeft>
          <div className={classes["image-upload-container"]}>
            <Carousel
              className={classes["image-container"]}
              autoPlay={false}
              animation="slide"
              indicators={false}
            >
              {uploadedImageUrls.map((imgSrc, idx) => (
                <div className={classes["image-item"]} key={imgSrc}>
                  <img
                    src={imgSrc}
                    alt={"car-space"}
                    onMouseEnter={uploadedImageMouseEnterHandler}
                    onMouseLeave={uploadedImageMouseLeaveHandler}
                  />
                  <DeleteOutlineIcon
                    className={classes["delete-icon"]}
                    fontSize="large"
                    sx={{ visibility: isDeleteIconVisible }}
                    onClick={imageDeleteHandler}
                    data-imagenum={idx}
                  />
                </div>
              ))}
            </Carousel>
            <InputField
              className={classes["image-uploader"]}
              type="file"
              onChange={imageUploadHandler}
              multiple={true}
              hidden={true}
            />
          </div>
          <div className={classes.actions}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={!formState.isFormValid}
            >
              {isLoading ? <CircularProgress size="1.5rem" /> : "Registration"}
            </Button>
          </div>
        </CarSpaceCardContentLeft>
        <CarSpaceCardContentRight>
          <div className={classes.details}>
            <div className={classes.details__item}>
              <BusinessIcon className={classes.icon} fontSize="large" />
              <div className={classes.details__item__content}>
                <InputField
                  className={classes["input-container"]}
                  inputClassName={classes.input}
                  label="Street Address"
                  type="text"
                  name="street"
                  value={formState.streetAddress.value}
                  onChange={streetAddressChangeHandler}
                />
                <InputField
                  className={classes["input-container"]}
                  inputClassName={classes.input}
                  label="City"
                  type="text"
                  name="city"
                  value={formState.city.value}
                  onChange={cityChangeHandler}
                />
                <div className={classes.details__item__content__row}>
                  <DropdownSelect
                    className={`${classes.input} ${classes.field}`}
                    selectClassName={classes.input}
                    selectMenuClassName={classes["select-menu"]}
                    selectItemClassName={classes["select-item"]}
                    labelId="stateLabelId"
                    selectId="stateSelectId"
                    label="State"
                    value={formState.state.value}
                    onChange={stateChangeHandler}
                    items={config.AUS_STATES}
                  />
                  <InputField
                    className={classes.input}
                    inputClassName={classes.input}
                    label="Postal Code"
                    type="number"
                    name="postcode"
                    value={formState.postcode.value}
                    onChange={postCodeChangeHandler}
                  />
                </div>
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
              />
            </div>
          </div>
        </CarSpaceCardContentRight>
      </CarSpaceCardContent>
    </form>
  );
};

export default CarSpaceRegistrationForm;
