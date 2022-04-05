import classes from "./ProviderListItem.module.css";

import { Typography } from "@mui/material";
// import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const ProviderListItem = ({
  streetAddress,
  notes,
  size,
  price,
  id,
  onClick,
}) => {
  const listItemClickHandler = () => {
    onClick(id);
  };

  return (
    <div className={classes.listItem}>
      <div className={classes.listItem__content}>
        <div className={classes.listItem__content__main}>
          <Typography
            className={classes.listItem__content__title}
            variant="sectionSubTitle"
            color="primary"
            onClick={listItemClickHandler}
          >
            {streetAddress}
          </Typography>
          <Typography
            variant="sectionContent"
            className={classes.listItem__content__description}
          >
            {notes}
          </Typography>
        </div>
        <div className={classes.listItem__content__details}>
          {/* <div className={classes.distance}>
            <DirectionsWalkIcon className={classes.walkIcon} />
            <Typography variant="sectionSubContent">50km</Typography>
          </div> */}
          <div className={classes.capacity_rate}>
            <Typography variant="sectionContent" className={classes.capacity}>
              Fits {size}
            </Typography>
            <Typography
              color="primary"
              variant="sectionContent"
              className={classes.rate}
            >
              ${price} per hour
            </Typography>
          </div>
        </div>
      </div>
      <img
        className={classes.listItem__image}
        alt="parking at Sydney1"
        src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"
      />
    </div>
  );
};

export default ProviderListItem;
