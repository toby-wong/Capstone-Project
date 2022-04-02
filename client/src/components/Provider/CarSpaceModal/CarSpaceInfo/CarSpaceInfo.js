import classes from "./CarSpaceInfo.module.css";

import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import StarIcon from "@mui/icons-material/Star";
import { Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";

const CarSpaceInfo = ({ carInfo, onClose }) => {
  return (
    <>
      <CarSpaceCardHeader
        title={`${carInfo.streetAddress}, ${carInfo.city}`}
        onClose={onClose}
      >
        <div className={classes["review-container"]}>
          <div className={classes["ratings"]}>
            <StarIcon color="yellow" fontSize="medium" />
            <Typography variant="carSpaceModalSubContent">(3.5/5)</Typography>
            <Typography
              variant="carSpaceModalSubContent"
              className={classes["review-link"]}
            >
              View 21 reviews
            </Typography>
          </div>
        </div>
      </CarSpaceCardHeader>
      <CarSpaceCardContent>
        <CarSpaceCardContentLeft>
          <Carousel
            className={classes["image-container"]}
            autoPlay={false}
            animation="slide"
            indicators={false}
          >
            <img
              src="https://www.sydney.com/sites/sydney/files/styles/open_graph/public/2019-03/croppedtile-121137-BondiBeachSunrise-imgDNSW.jpg?itok=Nw08p7Zp"
              alt="parking-space"
            />
            <img
              src="https://www.darlingharbour.com/getmedia/91d3141e-7cad-4376-9ed0-876213115596/darling-harbour-scenic.jpg"
              alt="parking-space"
            />
            <img
              src="https://www.sydney.com/sites/sydney/files/styles/open_graph/public/2022-02/164142-Sydney%20Harbour%20-%20sunrise%20over%20Circular%20Quay.jpg?itok=AKlqtCiC"
              alt="parking-space"
            />
          </Carousel>
          <div className={classes.actions}>
            <Button variant="contained" size="large">
              View Calendar
            </Button>
            <Button variant="contained" size="large">
              Edit Listing
            </Button>
          </div>
        </CarSpaceCardContentLeft>
        <CarSpaceCardContentRight>
          <div className={classes.details}>
            <div className={classes.details__item}>
              <BusinessIcon className={classes.icon} fontSize="large" />
              <div className={classes.details__item__content}>
                <Typography variant="carSpaceModalSubTitle">ADDRESS</Typography>
                <Typography variant="carSpaceModalContent">
                  {`${carInfo.streetAddress}, ${carInfo.city}, ${carInfo.state}, ${carInfo.postcode}`}
                </Typography>
              </div>
            </div>
            <div className={classes.details__item}>
              <AttachMoneyIcon
                className={classes.icon}
                fontSize="large"
                color="yellow"
              />
              <div className={classes.details__item__content}>
                <Typography variant="carSpaceModalSubTitle">Cost</Typography>
                <Typography variant="carSpaceModalContent">
                  $32 per Hour / $190 Per day
                </Typography>
              </div>
            </div>
            <div className={classes.details__item}>
              <DirectionsCarIcon className={classes.icon} fontSize="large" />
              <div className={classes.details__item__content}>
                <Typography variant="carSpaceModalSubTitle">
                  Maximum Vehicle Size
                </Typography>
                <Typography variant="carSpaceModalContent">
                  {carInfo.maxVehicleSize}
                </Typography>
              </div>
            </div>
            <div className={classes.notes}>
              <StickyNote2Icon className={classes.icon} fontSize="large" />
              <div className={classes.details__item__content}>
                <Typography variant="carSpaceModalSubTitle">Notes</Typography>
                <Typography
                  variant="carSpaceModalContent"
                  className={classes["notes-content"]}
                >
                  {carInfo.notes}
                </Typography>
              </div>
            </div>
          </div>
        </CarSpaceCardContentRight>
      </CarSpaceCardContent>
    </>
  );
};

export default CarSpaceInfo;
