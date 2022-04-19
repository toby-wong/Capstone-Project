import classes from "./CarSpaceMapPointObject.module.css";

import { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";

import InfoIcon from "@mui/icons-material/Info";
import { Icon } from "@mui/material";

const CarSpaceMapPointObject = ({
  id,
  longitude,
  latitude,
  streetAddress,
  onClick,
  openPopup = false,
}) => {
  const markerRef = useRef();

  const clickMarkerHandler = () => {
    onClick(id);
  };

  useEffect(() => {
    if (openPopup) markerRef.current.openPopup();
  });

  return (
    <Marker position={[longitude, latitude]} ref={markerRef}>
      <Popup className={classes.popup}>
        {streetAddress}
        <div className={classes.details} onClick={clickMarkerHandler}>
          <Icon
            className={classes.icon}
            fontSize="small"
            component={InfoIcon}
            color="primary"
          />
          Details
        </div>
      </Popup>
    </Marker>
  );
};

export default CarSpaceMapPointObject;
