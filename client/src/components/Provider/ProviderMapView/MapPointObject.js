import { useContext, useState} from "react";
import CarSpaceModalContext from "../../../contexts/carspace-modal-context";
import {Marker, Popup } from 'react-leaflet';
import {Icon} from "leaflet";

const MapPointObject = ({id, longitude, latitude, streetAddress}) => {
  const carSpaceModalContext = useContext(CarSpaceModalContext);
  
  const mapItemClickHandler = () => {
      carSpaceModalContext.openPage("/info", id);
  };

  return (
    <Marker
        position={[longitude, latitude]}
        eventHandlers={{
            click: mapItemClickHandler,
        }}>
        <Popup>
            {streetAddress}
        </Popup>
    </Marker>
  );
};

export default MapPointObject;
