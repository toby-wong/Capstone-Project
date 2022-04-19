// import classes from "./CarSpaceMapPointObject.module.css";

import { Marker, Popup } from "react-leaflet";

const CarSpaceMapPointObject = ({
  id,
  longitude,
  latitude,
  streetAddress,
  onClick,
}) => {
  const clickMarkerHandler = () => {
    onClick(id);
  };

  return (
    <Marker
      position={[longitude, latitude]}
      eventHandlers={{
        click: clickMarkerHandler,
      }}
    >
      <Popup>{streetAddress}</Popup>
    </Marker>
  );
};

export default CarSpaceMapPointObject;
