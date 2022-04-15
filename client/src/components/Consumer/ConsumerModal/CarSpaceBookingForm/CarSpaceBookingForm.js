import classes from "./CarSpaceBookingForm.module.css";

import { useContext, useEffect, useState } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import PaymentIcon from "@mui/icons-material/Payment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SellIcon from "@mui/icons-material/Sell";
import { Button, Icon, Typography } from "@mui/material";

import ConsumerModalContext from "../../../../contexts/consumer-modal-context";
import GeneralModalHeader from "../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../UI/GeneralModal/GeneralModalContent";
import ModalEntry from "../../../UI/ModalEntry/ModalEntry";
import DropdownSelect from "../../../UI/DropdownSelect/DropdownSelect";
import GeneralModalActions from "../../../UI/GeneralModal/GeneralModalActions";
import CarSpaceImageCarousel from "../../../Provider/CarSpaceModal/CarSpaceImageCarousel/CarSpaceImageCarousel";
import CarSpaceImage from "../../../Provider/CarSpaceModal/CarSpaceImage/CarSpaceImage";

const CarSpaceBookingForm = () => {
  const consumerModalContext = useContext(ConsumerModalContext);
  // const [carInfo, setCarInfo] = useState({images: []});

  // useEffect(() => {
  //   const url =
  // }, []);

  return (
    <form className={classes.form}>
      <GeneralModalHeader
        title={"Book Car Space"}
        onClose={consumerModalContext.closeModal}
      />
      <GeneralModalContent direction="row">
        <div className={classes.leftSection}>
          <ModalEntry className={classes.entry} icon={BusinessIcon}>
            <Typography variant="carSpaceModalSubTitle">Address</Typography>
            <Typography variant="carSpaceModalSubContent">
              507 Wattle Street
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
              $10 per hour / $200 per day
            </Typography>
          </ModalEntry>
          <ModalEntry className={classes.entry} icon={DirectionsCarIcon}>
            <Typography variant="carSpaceModalSubTitle">
              Maximum Vehicle Size
            </Typography>
            <Typography variant="carSpaceModalSubContent">Sedan</Typography>
          </ModalEntry>
          <ModalEntry className={classes.entry} icon={DirectionsCarIcon}>
            <DropdownSelect
              className={classes.dropdown}
              selectClassName={classes.select}
              selectMenuClassName={classes["select-menu"]}
              labelId="vehicleLabelId"
              selectId="vehicleSelectId"
              label="Select Vehicle"
              value={1}
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
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
            {/* {carInfo.images.map((imgObj, idx) => {
              return (
                <CarSpaceImage
                  key={idx}
                  src={`data:image/png;base64, ${imgObj.image_data}`}
                  alt="parking-space"
                />
              );
            })} */}
          </CarSpaceImageCarousel>
          <ModalEntry className={classes.entry} icon={PaymentIcon}>
            <Typography variant="carSpaceModalSubTitle">Payment</Typography>
            <Typography variant="carSpaceModalSubContent">
              Card Number : 1234 5678 9012 3456
            </Typography>
            <Typography variant="carSpaceModalSubContent">
              Expiry Date : 12/12/2027
            </Typography>
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
