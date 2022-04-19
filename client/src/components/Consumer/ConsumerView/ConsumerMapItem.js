import classes from "./ConsumerMapItem.module.css";

import { useContext } from "react";

import { Typography, Divider } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConsumerModalContext from "../../../contexts/consumer-modal-context";
import AuthContext from "../../../contexts/auth-context";
import SubModalContext from "../../../contexts/submodal-context";

const ConsumerMapItem = ({
  streetAddress,
  notes,
  size,
  price,
  id,
  image,
  longitude,
  latitude,
  onClick,
}) => {
  const consumerModalContext = useContext(ConsumerModalContext);
  const authContext = useContext(AuthContext);
  const subModalContext = useContext(SubModalContext);

  const mapItemClickHandler = () => {
    if (!authContext.isLoggedIn) {
      subModalContext.openModal({
        title: "Unauthorized",
        messages: ["Please log in to view the details of parking space."],
        actions: [
          {
            color: "primary",
            onClick: subModalContext.closeModal,
            content: "OK",
            width: "120px",
          },
        ],
      });
    } else {
      // consumerModalContext.openPage("/info", id);
      onClick(longitude, latitude);
    }
  };

  return (
    <div className={classes.listing} onClick={mapItemClickHandler}>
      <img
        className={classes.imageEntry}
        alt={"parking spot at"}
        src={`data:image/png;base64, ${image}`}
      />
      <div className={classes.lhs}>
        <Typography variant="sectionTitle" className={classes.listingTitle}>
          {streetAddress}
          <Divider
            orientation="horizontal"
            className={classes.navbar_divider_listingTitle}
          />
        </Typography>
        <Typography variant="listItemSubTitle" className={classes.description}>
          {notes.length > 200 ? notes.slice(0, 200) + "..." : notes}
        </Typography>
        <div className={classes.infoBar}>
          <div className={classes.capacity}>
            <DirectionsCarIcon
              className={classes.icon}
              fontSize="small"
              color="primary"
            />
            Fits {size}
          </div>
          <div className={classes.rate}>${price} AUD hour</div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerMapItem;
