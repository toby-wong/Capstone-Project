import classes from "./CarSpaceInfo.module.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import StarIcon from "@mui/icons-material/Star";
import { Button, CircularProgress, Typography } from "@mui/material";
import CarSpaceImageCarousel from "../CarSpaceImageCarousel/CarSpaceImageCarousel";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";

import { useContext, useEffect, useState } from "react";

import * as config from "../../../../config";
import { sendRequest } from "../../../../utility";
import CarSpaceModalContext from "../../../../contexts/carspace-modal-context";
import CarSpaceImage from "../CarSpaceImage/CarSpaceImage";

const CarSpaceInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [carInfo, setCarInfo] = useState({
    images: [],
  });
  const carSpaceModalContext = useContext(CarSpaceModalContext);

  const editListHandler = () => {
    carSpaceModalContext.openPage("/edit");
  };

  const displayReviewsHandler = () => {
    carSpaceModalContext.openPage("/reviews");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carSpaceModalContext.carSpaceInfo.fetched)
          return setCarInfo(carSpaceModalContext.carSpaceInfo);
        const authToken = localStorage.getItem("parkItAuthToken");
        const getCarInfoUrl = `${config.SERVER_URL}/api/provider/parking/${carSpaceModalContext.carSpaceId}`;
        const getCarInfoOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const getCarInforesponse = await sendRequest(
          getCarInfoUrl,
          getCarInfoOptions,
          setIsLoading
        );
        if (getCarInforesponse.status >= 300 || !getCarInforesponse.status)
          throw Error;

        setCarInfo(getCarInforesponse.data);
        carSpaceModalContext.fetchCarSpaceInfo(getCarInforesponse.data);
      } catch (e) {
        console.log(e.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [carSpaceModalContext, setIsLoading]);

  return (
    <>
      {isLoading && (
        <div className={classes["spinner-container"]}>
          <CircularProgress className={classes.spinner} />
        </div>
      )}
      {!isLoading && (
        <>
          <CarSpaceCardHeader
            title={`${carInfo.streetAddress}, ${carInfo.city}`}
            onClose={carSpaceModalContext.closeModal}
          >
            <div className={classes["review-container"]}>
              <div className={classes["ratings"]}>
                <StarIcon color="yellow" fontSize="medium" />
                <Typography variant="carSpaceModalSubContent">
                  {carInfo.avg_rating ? `${carInfo.avg_rating} /5` : ""}
                </Typography>
                <Typography
                  variant="carSpaceModalSubContent"
                  className={classes["review-link"]}
                  onClick={displayReviewsHandler}
                >
                  {carInfo.n_ratings
                    ? `View ${carInfo.n_ratings} reviews`
                    : "No reviews"}
                </Typography>
              </div>
            </div>
          </CarSpaceCardHeader>
          <CarSpaceCardContent>
            <CarSpaceCardContentLeft>
              <CarSpaceImageCarousel>
                {carInfo.images.map((imgObj, idx) => {
                  return (
                    <CarSpaceImage
                      key={idx}
                      src={`data:image/png;base64, ${imgObj.image_data}`}
                      alt="parking-space"
                    />
                  );
                })}
              </CarSpaceImageCarousel>

              <div className={classes.actions}>
                <Button variant="contained" size="large">
                  View Bookings
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={editListHandler}
                  color="secondary"
                >
                  Edit Listing
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
                      {`${carInfo.startTime} ~ ${carInfo.endTime}`}
                    </Typography>
                  </div>
                </div>
                <div className={classes.details__item}>
                  <BusinessIcon className={classes.icon} fontSize="large" />
                  <div className={classes.details__item__content}>
                    <Typography variant="carSpaceModalSubTitle">
                      ADDRESS
                    </Typography>
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
                    <Typography variant="carSpaceModalSubTitle">
                      Cost
                    </Typography>
                    <Typography variant="carSpaceModalContent">
                      ${carInfo.price} per hour / ${carInfo.price * 7} per day
                    </Typography>
                  </div>
                </div>
                <div className={classes.details__item}>
                  <DirectionsCarIcon
                    className={classes.icon}
                    fontSize="large"
                  />
                  <div className={classes.details__item__content}>
                    <Typography variant="carSpaceModalSubTitle">
                      Maximum Vehicle Size
                    </Typography>
                    <Typography variant="carSpaceModalContent">
                      {carInfo.size}
                    </Typography>
                  </div>
                </div>
                <div className={classes.notes}>
                  <StickyNote2Icon className={classes.icon} fontSize="large" />
                  <div className={classes.details__item__content}>
                    <Typography variant="carSpaceModalSubTitle">
                      Notes
                    </Typography>
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
      )}
    </>
  );
};

export default CarSpaceInfo;
