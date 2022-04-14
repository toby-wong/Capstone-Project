import classes from "./CarSpaceInfo.module.css";

import { CircularProgress } from "@mui/material";
import CarSpaceImageCarousel from "../CarSpaceImageCarousel/CarSpaceImageCarousel";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import CarSpaceImage from "../CarSpaceImage/CarSpaceImage";
import CarSpaceInfoDetails from "./CarSpaceInfoDetails";
import CarSpaceInfoReviews from "./CarSpaceInfoReviews";
import CarSpaceInfoActions from "./CarSpaceInfoActions";

import { useContext, useEffect, useState } from "react";

import * as config from "../../../../config";
import { sendRequest } from "../../../../utility";
import CarSpaceModalContext from "../../../../contexts/carspace-modal-context";

const CarSpaceInfo = ({ status }) => {
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

  const viewBookingsHandler = () => {
    carSpaceModalContext.openPage("/bookings");
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

        console.log(getCarInforesponse.data);
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
            <CarSpaceInfoReviews
              avgRating={carInfo.avg_rating}
              nRatings={carInfo.n_ratings}
              onClickReview={displayReviewsHandler}
            />
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
              {(status === "active" || status === "pending") && (
                <CarSpaceInfoActions
                  actions={[
                    {
                      content: "View Bookings",
                      color: "primary",
                      onClick: viewBookingsHandler,
                    },
                    {
                      content: "Edit Listings",
                      color: "secondary",
                      onClick: editListHandler,
                    },
                  ]}
                />
              )}
            </CarSpaceCardContentLeft>
            <CarSpaceCardContentRight>
              <CarSpaceInfoDetails
                startTime={carInfo.startTime}
                endTime={carInfo.endTime}
                streetAddress={carInfo.streetAddress}
                city={carInfo.city}
                state={carInfo.state}
                postcode={carInfo.postcode}
                price={carInfo.price}
                size={carInfo.size}
                notes={carInfo.notes}
              />
            </CarSpaceCardContentRight>
          </CarSpaceCardContent>
        </>
      )}
    </>
  );
};

export default CarSpaceInfo;
