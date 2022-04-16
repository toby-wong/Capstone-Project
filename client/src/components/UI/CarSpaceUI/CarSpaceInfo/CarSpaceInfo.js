import classes from "./CarSpaceInfo.module.css";

import { CircularProgress } from "@mui/material";

import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import CarSpaceCardContentLeft from "../CarSpaceCard/CarSpaceCardContentLeft";
import CarSpaceCardContentRight from "../CarSpaceCard/CarSpaceCardContentRight";
import CarSpaceInfoReviews from "./CarSpaceInfoReviews/CarSpaceInfoReviews";

// import CarSpaceInfoImageCarousel from "./CarSpaceInfoImageCarousel/CarSpaceInfoImageCarousel";
// import CarSpaceInfoImage from "./CarSpaceInfoImage/CarSpaceInfoImage";

import CarSpaceInfoImageCarousel from "./CarSpaceInfoImageCarousel/CarSpaceImageCarousel";
import CarSpaceInfoImage from "./CarSpaceInfoImage/CarSpaceImage";

import CarSpaceInfoActions from "./CarSpaceInfoActions/CarSpaceInfoActions";
import CarSpaceInfoDetails from "./CarSpaceInfoDetails/CarSpaceInfoDetails";

const CarSpaceInfo = ({
  title,
  carSpaceInfo,
  actions,
  isLoading,
  onClose,
  onClickReview,
}) => {
  return (
    <>
      {isLoading && (
        <div className={classes["spinner-container"]}>
          <CircularProgress className={classes.spinner} />
        </div>
      )}
      {!isLoading && (
        <>
          <CarSpaceCardHeader title={title} onClose={onClose}>
            <CarSpaceInfoReviews
              avgRating={carSpaceInfo.avg_rating}
              nRatings={carSpaceInfo.n_ratings}
              onClickReview={onClickReview}
            />
          </CarSpaceCardHeader>
          <CarSpaceCardContent>
            <CarSpaceCardContentLeft>
              <CarSpaceInfoImageCarousel>
                {carSpaceInfo.images.map((imgObj, idx) => {
                  return (
                    <CarSpaceInfoImage
                      key={idx}
                      src={`data:image/png;base64, ${imgObj.image_data}`}
                      alt="parking-space"
                    />
                  );
                })}
              </CarSpaceInfoImageCarousel>
              <CarSpaceInfoActions actions={actions} />
            </CarSpaceCardContentLeft>
            <CarSpaceCardContentRight>
              <CarSpaceInfoDetails
                startTime={carSpaceInfo.startTime}
                endTime={carSpaceInfo.endTime}
                streetAddress={carSpaceInfo.streetAddress}
                city={carSpaceInfo.city}
                state={carSpaceInfo.state}
                postcode={carSpaceInfo.postcode}
                price={carSpaceInfo.price}
                size={carSpaceInfo.size}
                notes={carSpaceInfo.notes}
              />
            </CarSpaceCardContentRight>
          </CarSpaceCardContent>
        </>
      )}
    </>
  );
};

export default CarSpaceInfo;
