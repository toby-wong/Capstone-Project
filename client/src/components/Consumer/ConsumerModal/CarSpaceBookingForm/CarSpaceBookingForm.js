import classes from "./CarSpaceBookingForm.module.css";

import { useContext, useEffect, useState } from "react";

import * as config from "../../../../config";
import * as utility from "../../../../utility";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import PaymentIcon from "@mui/icons-material/Payment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SellIcon from "@mui/icons-material/Sell";
import { Button, Icon, Typography } from "@mui/material";

import ConsumerModalContext from "../../../../contexts/consumer-modal-context";
import CarSpaceCardHeader from "../../../UI/CarSpaceUI/CarSpaceCard/CarSpaceCardHeader";
import GeneralModalContent from "../../../UI/GeneralModal/GeneralModalContent";
import ModalEntry from "../../../UI/ModalEntry/ModalEntry";
import DropdownSelect from "../../../UI/DropdownSelect/DropdownSelect";
import GeneralModalActions from "../../../UI/GeneralModal/GeneralModalActions";
import CarSpaceImageCarousel from "../../../UI/CarSpaceUI/CarSpaceInfo/CarSpaceInfoImageCarousel/CarSpaceImageCarousel";
import CarSpaceImage from "../../../UI/CarSpaceUI/CarSpaceInfo/CarSpaceInfoImage/CarSpaceImage";
import AuthContext from "../../../../contexts/auth-context";

const CarSpaceBookingForm = () => {
  const consumerModalContext = useContext(ConsumerModalContext);
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myCars, setMyCars] = useState([]);

  const { streetAddress, city, state, postcode } =
    consumerModalContext.carSpaceInfo;
  const { price, size, images } = consumerModalContext.carSpaceInfo;

  console.log(authContext);

  useEffect(() => {
    const getMyCars = async () => {
      try {
        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/consumer/vehicle/all`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };
        const response = await utility.sendRequest(url, options, setIsLoading);

        if (!response.status || response.status >= 300)
          throw Error(config.NETWORK_ERROR_MESSAGE);

        const cars = [];
        for (const carObj of response.data) {
          cars.push(`${carObj.carMake} ${carObj.carModel}(${carObj.carYear})`);
        }

        setMyCars(cars);
      } catch (e) {
        setError(true);
      }
    };

    getMyCars();
  }, []);

  return (
    <form className={classes.form}>
      <CarSpaceCardHeader
        title={"Book Car Space"}
        onClose={consumerModalContext.closeModal}
        onBack={consumerModalContext.backToInfo}
      />
      <GeneralModalContent direction="row">
        <div className={classes.leftSection}>
          <ModalEntry className={classes.entry} icon={BusinessIcon}>
            <Typography variant="carSpaceModalSubTitle">Address</Typography>
            <Typography variant="carSpaceModalSubContent">
              {`${streetAddress}, ${city}, ${state}, ${postcode}`}
            </Typography>
          </ModalEntry>
          <ModalEntry
            className={classes.entry}
            icon={AccessTimeIcon}
            direction="row"
          >
            <div className={classes.vertical}>
              <Typography variant="carSpaceModalSubTitle">From:</Typography>
              <Typography variant="carSpaceModalSubContent">
                12/02/2022 02:22pm
              </Typography>
            </div>
            <div className={classes.vertical}>
              <Typography variant="carSpaceModalSubTitle">Until:</Typography>
              <Typography variant="carSpaceModalSubContent">
                14/02/2022 02:22pm
              </Typography>
            </div>
          </ModalEntry>
          <ModalEntry className={classes.entry} icon={AttachMoneyIcon}>
            <Typography variant="carSpaceModalSubTitle">Price</Typography>
            <Typography variant="carSpaceModalSubContent">
              {`$${price} per hour / $${price * 24} per day`}
            </Typography>
          </ModalEntry>
          <ModalEntry className={classes.entry} icon={DirectionsCarIcon}>
            <Typography variant="carSpaceModalSubTitle">
              Maximum Vehicle Size
            </Typography>
            <Typography variant="carSpaceModalSubContent">{size}</Typography>
          </ModalEntry>
          <ModalEntry className={classes.entry} icon={DirectionsCarIcon}>
            <DropdownSelect
              className={classes.dropdown}
              selectClassName={classes.select}
              selectMenuClassName={classes["select-menu"]}
              labelId="vehicleLabelId"
              selectId="vehicleSelectId"
              label="Select Vehicle"
              // value={formState.myCar}
              value={""}
              items={myCars}
              // value={formState.maxVehicleSize.value}
              // onChange={maxVehicleSizeChangeHandler}
              // items={config.VEHICLE_TYPES}
            />
          </ModalEntry>
          <GeneralModalActions>
            <Button
              variant="contained"
              size="large"
              //  onClick={clickDeleteButtonHandler}
            >
              Book Now
            </Button>
          </GeneralModalActions>
        </div>
        <div className={classes.rightSection}>
          <CarSpaceImageCarousel className={classes["image-carousel"]}>
            {images.map((imgObj, idx) => {
              return (
                <CarSpaceImage
                  key={idx}
                  src={`data:image/png;base64, ${imgObj.image_data}`}
                  alt="parking-space"
                />
              );
            })}
          </CarSpaceImageCarousel>
          <ModalEntry className={classes.entry} icon={PaymentIcon}>
            <Typography variant="carSpaceModalSubTitle">Payment</Typography>
            {authContext.userInfo.card_number === "" ? (
              <Typography variant="carSpaceModalSubContent">
                No card found. Please register a card in Account Details Page.
              </Typography>
            ) : (
              <>
                <Typography variant="carSpaceModalSubContent">
                  {`Card Number : ${authContext.userInfo.card_number}`}
                </Typography>
                <Typography variant="carSpaceModalSubContent">
                  {`Expiry Date : ${authContext.userInfo.expiry_date}`}
                </Typography>
              </>
            )}
          </ModalEntry>
          <ModalEntry className={classes.entry} icon={SellIcon}>
            <Typography variant="carSpaceModalSubTitle">Total Cost</Typography>
            <Typography variant="carSpaceModalSubContent">$2000</Typography>
          </ModalEntry>
        </div>
      </GeneralModalContent>
    </form>
  );
};

export default CarSpaceBookingForm;
/*
  <InputField
    className={classes.input}
    inputClassName={classes.input}
    label="Address"
    type="text"
    name="address"
    readOnly
    // value={formState.price.value}
    // onChange={priceChangeHandler}
  />
*/
