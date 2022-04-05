import { Button, Paper, Tab, Tabs, Typography, Divider} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import classes from "./ProviderMapView.module.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const ProviderMapView = () => {
    const location = useLocation();
    const activeTab = location.pathname.split("/").slice(2).join("/");
    console.log("Here is activeTab")
    console.log(activeTab)
  
    return (
    <div class={classes.body}>
        <div class={classes.overlayContainer}>
            {/* <Typography
                className={classes.title}
                variant="modalTitle"
                color="textSecondary"
                fontWeight="Bold"
            >
            Your Car Spaces
            </Typography> */}
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                size="large"
                style={{
                    borderRadius: 15
                }}
                // onClick={addSpaceHandler}
            >
            + Add
            </Button>
        </div>
        <MapContainer center={[-33.916663, 151.2420]} zoomControl={false} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-33.916663, 151.2420]}>
                <Popup>
                    Welcome to BMG HQ
                </Popup>
            </Marker>
        </MapContainer>
   </div>
  )
};

export default ProviderMapView;




