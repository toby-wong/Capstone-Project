import classes from "./ConsumerBookingInfo.module.css";

import { useEffect, useState } from "react";

import * as config from "../../../config";
import * as utility from "../../../utility";

import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SellIcon from "@mui/icons-material/Sell";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import CarSpaceCardHeader from "../../UI/CarSpaceUI/CarSpaceCard/CarSpaceCardHeader";
import ModalEntry from "../../UI/ModalEntry/ModalEntry";
import GeneralModalActions from "../../UI/GeneralModal/GeneralModalActions";
import CarSpaceImageCarousel from "../../UI/CarSpaceUI/CarSpaceInfo/CarSpaceInfoImageCarousel/CarSpaceImageCarousel";
import CarSpaceImage from "../../UI/CarSpaceUI/CarSpaceInfo/CarSpaceInfoImage/CarSpaceImage";
import CarSpaceInfoFavourite from "../../UI/CarSpaceUI/CarSpaceInfo/CarSpaceInfoFavourite/CarSpaceInfoFavourite";

const ConsumerBookingInfo = ({ context, subModalContext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ images: [] });

  useEffect(() => {
    const fetchData = async () => {
      const { cost, publishDate, vehicleId, carSpaceId } = context.content;
      try {
        setIsLoading(true);
        // Get CarSpaceInfo
        const carSpaceInfo = await utility.fetchCarSpaceInfo(carSpaceId);

        // Get CarInfo
        const carInfo = await utility.fetchCarInfo(vehicleId);
        const { carMake, carColour, carModel, carYear, carRego } = carInfo;

        // Aggregate data and fetch
        const fetchedData = {
          ...carSpaceInfo,
          vehicle: `${carMake} ${carColour} ${carModel}(${carYear}) [${carRego}]`,
          transactionDate: publishDate,
          totalCost: cost,
        };
        setData(fetchedData);
        setIsLoading(false);
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [context]);

  return (
    <Paper variant="bookingInfoBody">
      <CarSpaceCardHeader
        title={"Booking Receipt"}
        onClose={context.closeModal}
      />
      {isLoading && (
        <div className={classes["center-container"]}>
          <CircularProgress style={{ color: "var(--green)" }} />
        </div>
      )}
      {!isLoading && error && (
        <div className={classes["center-container"]}>
          {config.NETWORK_ERROR_MESSAGE}
        </div>
      )}
      {!isLoading && !error && (
        <>
          <Paper variant="bookingInfoContent">
            <Paper variant="bookingInfoContentLeft">
              <div className={classes.header}>
                <CarSpaceInfoFavourite
                  modalContext={context}
                  subModalContext={subModalContext}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  carSpaceId={context.content.carSpaceId}
                />
              </div>
              <ModalEntry className={classes.entry} icon={BusinessIcon}>
                <Typography variant="carSpaceModalSubTitle">Address</Typography>
                <Typography variant="carSpaceModalSubContent">
                  {data.address}
                </Typography>
              </ModalEntry>
              <ModalEntry
                className={classes.entry}
                icon={AccessTimeIcon}
                direction="row"
              >
                <ModalEntry>
                  <Typography variant="carSpaceModalSubTitle">From</Typography>
                  <Typography variant="carSpaceModalSubContent">
                    {data.startDateTime}
                  </Typography>
                </ModalEntry>
                <ModalEntry>
                  <Typography variant="carSpaceModalSubTitle">Until</Typography>
                  <Typography variant="carSpaceModalSubContent">
                    {data.endDateTime}
                  </Typography>
                </ModalEntry>
              </ModalEntry>
              <ModalEntry className={classes.entry} icon={AttachMoneyIcon}>
                <Typography variant="carSpaceModalSubTitle">Price</Typography>
                <Typography variant="carSpaceModalSubContent">
                  {`$${data.price} per hour / $${data.price * 24} per day`}
                </Typography>
              </ModalEntry>
              <ModalEntry className={classes.entry} icon={DirectionsCarIcon}>
                <Typography variant="carSpaceModalSubTitle">
                  Max Vehicle Size
                </Typography>
                <Typography variant="carSpaceModalSubContent">
                  {data.maxVehicleSize}
                </Typography>
              </ModalEntry>
              <ModalEntry className={classes.entry} icon={DirectionsCarIcon}>
                <Typography variant="carSpaceModalSubTitle">Vehicle</Typography>
                <Typography variant="carSpaceModalSubContent">
                  {data.vehicle}
                </Typography>
              </ModalEntry>
            </Paper>
            <Paper variant="bookingInfoContentRight">
              <CarSpaceImageCarousel className={classes["image-carousel"]}>
                {data.images.map((imgObj, idx) => {
                  return (
                    <CarSpaceImage
                      key={idx}
                      src={`data:image/png;base64, ${imgObj.image_data}`}
                      alt="parking-space"
                    />
                  );
                })}
              </CarSpaceImageCarousel>
              <ModalEntry className={classes.entry} icon={CalendarTodayIcon}>
                <Typography variant="carSpaceModalSubTitle">
                  Transaction Date
                </Typography>
                <Typography variant="carSpaceModalSubContent">
                  {data.transactionDate}
                </Typography>
              </ModalEntry>
              <ModalEntry className={classes.entry} icon={SellIcon}>
                <Typography variant="carSpaceModalSubTitle">
                  Total Cost
                </Typography>
                <Typography variant="carSpaceModalSubContent">
                  ${data.totalCost}
                </Typography>
              </ModalEntry>
            </Paper>
          </Paper>
          <GeneralModalActions>
            <Button
              variant="contained"
              type="submit"
              size="large"
              className={classes.btn}
            >
              Write Review
            </Button>
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="warning"
              // disabled={!formState.isFormValid}
              className={classes.btn}
            >
              {isLoading ? (
                <CircularProgress size="1.5rem" />
              ) : (
                "Cancel Booking"
              )}
            </Button>
          </GeneralModalActions>
        </>
      )}
    </Paper>
  );
};

export default ConsumerBookingInfo;
