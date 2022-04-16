import { useContext, useState } from "react";

import { CircularProgress } from "@mui/material";

import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceImageCarousel from "../CarSpaceImageCarousel/CarSpaceImageCarousel";
import CarSpaceInfoReviews from "../CarSpaceInfo/CarSpaceInfoReviews";
import classes from "./ProviderCarSpaceInfo.module.css";

const ProviderCarSpaceInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [carInfo, setCarInfo] = useState({
    images: [],
  });
  const providerModalContext = useContext(ProviderModalContext);

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
            onClose={providerModalContext.closeModal}
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

export default ProviderCarSpaceInfo;
