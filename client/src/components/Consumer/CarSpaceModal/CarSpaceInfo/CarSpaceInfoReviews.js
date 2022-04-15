import classes from "./CarSpaceInfoReviews.module.css";

import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const CarSpaceInfoReviews = ({ avgRating, nRatings, onClickReview }) => {
  return (
    <div className={classes["review-container"]}>
      <div className={classes["ratings"]}>
        <StarIcon color="yellow" fontSize="medium" />
        <Typography variant="carSpaceModalSubContent">
          {avgRating ? `${avgRating} /5` : ""}
        </Typography>
        <Typography
          variant="carSpaceModalSubContent"
          className={classes["review-link"]}
          onClick={onClickReview}
        >
          {nRatings ? `View ${nRatings} reviews` : "No reviews"}
        </Typography>
      </div>
    </div>
  );
};

export default CarSpaceInfoReviews;
