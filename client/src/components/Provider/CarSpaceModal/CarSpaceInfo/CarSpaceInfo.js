import classes from "./CarSpaceInfo.module.css";

import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import StarIcon from "@mui/icons-material/Star";
import { Button, CircularProgress, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";

import { useEffect, useState } from "react";

import * as config from "../../../../config";
import { sendRequest } from "../../../../utility";

const CarSpaceInfo = ({ carSpaceId, onClose, onEdit, onClickReviews }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [carInfo, setCarInfo] = useState({});
  const [ratingInfo, setRatingInfo] = useState({
    total: 0,
    average: 0,
  });
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const authToken = localStorage.getItem("parkItAuthToken");
        const getCarInfoUrl = `${config.SERVER_URL}/api/provider/parking/${carSpaceId}`;
        const getCarInfoOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const getCarInforesponse = await sendRequest(
          getCarInfoUrl,
          getCarInfoOptions
        );
        if (getCarInforesponse.status >= 300 || !getCarInforesponse.status)
          throw Error;

        const getRatingsUrl = `${config.SERVER_URL}/api/provider/parking/reviews/${carSpaceId}`;
        const getRatingsOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const getRatingsResponse = await sendRequest(
          getRatingsUrl,
          getRatingsOptions
        );
        if (getRatingsResponse.status >= 300 || !getRatingsResponse.status)
          throw Error;

        const getImageUrl = `${config.SERVER_URL}/api/provider/parking/images/${carSpaceId}`;
        const getImageOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const getImageResponse = await sendRequest(
          getImageUrl,
          getImageOptions
        );
        if (getImageResponse.status >= 300 || !getImageResponse.status)
          throw Error;

        setCarInfo(getCarInforesponse.data);
        const newRatingInfo = {
          total: getRatingsResponse.data.length,
          average:
            getRatingsResponse.data.reduce((pre, curr) => pre + curr, 0) /
            getRatingsResponse.data.length,
        };

        setRatingInfo(newRatingInfo);
        setImage(getImageResponse.data.map((el) => el.image));
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [carSpaceId]);

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <>
          <CarSpaceCardHeader
            title={`${carInfo.streetAddress}, ${carInfo.city}`}
            onClose={onClose}
          >
            <div className={classes["review-container"]}>
              <div className={classes["ratings"]}>
                <StarIcon color="yellow" fontSize="medium" />
                <Typography variant="carSpaceModalSubContent">
                  ({ratingInfo.average}/5)
                </Typography>
                <Typography
                  variant="carSpaceModalSubContent"
                  className={classes["review-link"]}
                  onClick={onClickReviews}
                >
                  View {ratingInfo.total} reviews
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
                {image.map((imgSrc, idx) => {
                  return (
                    <img
                      key={idx}
                      src={"data:image/png;base64, " + imgSrc}
                      alt="parking-space"
                    />
                  );
                })}
              </Carousel>
              <div className={classes.actions}>
                <Button variant="contained" size="large">
                  View Bookings
                </Button>
                <Button variant="contained" size="large" onClick={onEdit}>
                  Edit Listing
                </Button>
              </div>
            </CarSpaceCardContentLeft>
            <CarSpaceCardContentRight>
              <div className={classes.details}>
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
