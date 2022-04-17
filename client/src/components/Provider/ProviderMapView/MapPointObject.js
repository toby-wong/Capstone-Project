import { useContext } from "react";
import ProviderModalContext from "../../../contexts/provider-modal-context";
import { Marker, Popup } from "react-leaflet";

const MapPointObject = ({ id, longitude, latitude, streetAddress }) => {
  const providerModalContext = useContext(ProviderModalContext);

  const mapItemClickHandler = () => {
    providerModalContext.openPage("/info", id);
  };

  return (
    <Marker
      position={[longitude, latitude]}
      eventHandlers={{
        click: mapItemClickHandler,
      }}
    >
      <Popup>{streetAddress}</Popup>
    </Marker>
  );
};

export default MapPointObject;
