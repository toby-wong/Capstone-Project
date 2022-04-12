import classes from "./ProviderMapItem.module.css";

import { useContext } from "react";
import CarSpaceModalContext from "../../../contexts/carspace-modal-context";

import { Typography, Divider} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const ProviderMapItem = ({ streetAddress, notes, size, price, id, image }) => {
  const carSpaceModalContext = useContext(CarSpaceModalContext);

  const mapItemClickHandler = () => {
    carSpaceModalContext.openPage("/info", id);
  };

  return (
    <div className={classes.listing} onClick={mapItemClickHandler}>
      <div className={classes.imageContainer}>
        <img className={classes.imageEntry}  alt={"parking spot at"} src={`data:image/png;base64, ${image}`}/>
      </div>
      <div className={classes.lhs}>
          <Typography 
              variant="sectionTitle"
              className={classes.listingTitle}
          >
              {streetAddress}
              <Divider orientation="horizontal" className={classes.navbar_divider_listingTitle} />
          </Typography>
          <div className={classes.description}>
            {notes.length > 200 ? notes.slice(0, 200) + "..." : notes}
          </div>
          <div className={classes.infoBar}>
              <div className={classes.capacity}>
                  <DirectionsCarIcon
                    className={classes.icon}
                    fontSize="small"
                    color="primary"
                  />
                  Fits {size}
              </div>
              <div className={classes.rate}>
                  ${price} AUD hour
              </div>
          </div>
      </div>
  </div>
  );
};

export default ProviderMapItem;
