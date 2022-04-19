// import classes from "./CarSpaceMapPointObject.module.css";

import { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";

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
    <Marker
      position={[longitude, latitude]}
      eventHandlers={{
        click: clickMarkerHandler,
      }}
      ref={markerRef}
    >
      <Popup>{streetAddress}</Popup>
    </Marker>
  );
};

export default CarSpaceMapPointObject;
