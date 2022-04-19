import classes from "./CarSpaceMap.module.css";

import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { CircularProgress } from "@mui/material";

import CarSpaceMapPointObject from "../CarSpaceMapPointObject/CarSpaceMapPointObject";

const CarSpaceMap = ({
  isLoading,
  center,
  zoom,
  items,
  children,
  onItemClick = () => {},
}) => {
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <div className={classes.mapContainer}>
      {isLoading && (
        <div className={classes.center_container}>
          <CircularProgress className={classes.spinner} />
        </div>
      )}
      {!isLoading && (
        <>
          <MapContainer
            className={classes.mapContainer}
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
          >
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items.map((item) => (
              <CarSpaceMapPointObject
                key={item.pk}
                id={item.pk}
                longitude={item.longitude}
                latitude={item.latitude}
                streetAddress={item.streetAddress}
                onClick={onItemClick}
              />
            ))}
          </MapContainer>
          {children}
        </>
      )}
    </div>
  );
};

export default CarSpaceMap;
