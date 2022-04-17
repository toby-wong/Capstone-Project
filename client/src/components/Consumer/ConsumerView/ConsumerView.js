import classes from "./ConsumerView.module.css";

import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MapContainer, TileLayer } from "react-leaflet";

import { sendRequest } from "../../../utility";
import * as config from "../../../config";

import ConsumerModalContext from "../../../contexts/consumer-modal-context";

import {
  Button,
  Tab,
  Tabs,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

// React Icon import
import HistoryIcon from "@mui/icons-material/History";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ConsumerMapItem from "./ConsumerMapItem";
import MapPointObject from "./MapPointObject";
import InputField from "../../UI/InputField/InputField";

const ConsumerView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const consumerModalContext = useContext(ConsumerModalContext);

  const [error, setError] = useState({ value: false, message: "" });
  const [consumerSpaces, setConsumerSpaces] = useState([]);
  const [center, setCenter] = useState([-33.9139982, 151.2418546]);
  const [zoom, setZoom] = useState(17);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/provider/parking/all`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };
        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        console.log(response.data);
        setConsumerSpaces(response.data);
      } catch (e) {
        setError({
          value: true,
          message: config.NETWORK_ERROR_MESSAGE,
        });
      }
    };

    fetchData();
  }, [consumerModalContext.pageRefreshStatus]);

  const sendSearch = (e) => {
    var filteredResults = consumerSpaces.filter(carSpace => carSpace.streetAddress.includes(e.target.value));
    setQuery(e.target.value);
    console.log(filteredResults);
    setQueryResults(filteredResults);
  }

  return (
    <div className={classes.bodyContainer}>
      <div className={classes.menuContainer}>
        <Typography
          variant="modalTitle"
          className={classes.title}
          color="textSecondary"
          fontWeight="Bold"
        >
          {" "}
          Your Car Spaces
        </Typography>
        <div className={classes.interactionSection}>
          <InputField
            className={classes.searchBar}
            inputClassName={classes.input}
            onChange={sendSearch}
            label="Search"
            type="text"
            name="query"
          />
          <Divider
            orientation="horizontal"
            className={classes.navbar_divider_listingStart}
          />
          <Tabs
            orientation="horizontal"
            className={classes.tabContainer}
            value="/hidden"
          >
            <Tab
              className={classes.menu__tab}
              component={Link}
              to="/account/favourites"
              value="/account/favourites"
              label="favourite Spots"
              icon={<FavoriteIcon className={classes["tab-icon"]} />}
              iconPosition="start"
            />
            <Tab
              className={classes.menu__tab}
              component={Link}
              to="/account/history/consumer"
              value="/account/history/consumer"
              label="Past Bookings"
              icon={<HistoryIcon className={classes["tab-icon"]} />}
              iconPosition="start"
            />
            <Tab
              className={classes.menu__tab}
              component={Link}
              to="/account/myCars"
              value="/account/myCars"
              label="Your Cars"
              icon={<DirectionsCarIcon className={classes["tab-icon"]} />}
              iconPosition="start"
            />
            <Tab
              className={classes.hidden}
              component={Link}
              to="/account/favourites"
              value="/hidden"
              label="favourite Spots"
              icon={<FavoriteIcon className={classes["tab-icon"]} />}
              iconPosition="start"
            />
          </Tabs>
        </div>
        <div className={classes.listingContainer}>
          <Scrollbars
            renderView={(props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  overflowX: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              />
            )}
            renderTrackHorizontal={(props) => (
              <div {...props} style={{ display: "none" }} className="view" />
            )}
          >
            {isLoading && (
              <div className={classes.center_container}>
                <CircularProgress className={classes.spinner} />
              </div>
            )}
            {/* If query is empty, render all car spaces*/}
            {!isLoading &&
              !error.value &&
              query === "" &&
              consumerSpaces.map((item) => (
                <ConsumerMapItem
                  key={item.pk}
                  id={item.pk}
                  streetAddress={item.streetAddress}
                  notes={item.notes}
                  size={item.size}
                  price={item.price}
                  image={item.images[0].image_data}
                />
              ))}
            {/* Else render values from query space */}
            {!isLoading &&
              !error.value &&
              query != "" &&
              queryResults.map((item) => (
                <ConsumerMapItem
                  key={item.pk}
                  id={item.pk}
                  streetAddress={item.streetAddress}
                  notes={item.notes}
                  size={item.size}
                  price={item.price}
                  image={item.images[0].image_data}
                />
              ))}
            {!isLoading && error.value && (
              <div className={classes.center_container}>{error.message}</div>
            )}
          </Scrollbars>
        </div>
      </div>
      <div className={classes.mapContainer}>
        <MapContainer
          className={classes.mapContainer}
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          // eventHandlers={{
          //     click: mapItemClickHandler,
          // }}>
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {isLoading && (
            <div className={classes.center_container}>
              <CircularProgress className={classes.spinner} />
            </div>
          )}
          {!isLoading &&
            !error.value &&
            consumerSpaces.length !== 0 &&
            consumerSpaces.map((item) => (
              <MapPointObject
                key={item.pk}
                id={item.pk}
                longitude={item.longitude}
                latitude={item.latitude}
                streetAddress={item.streetAddress}
              />
            ))}
          {!isLoading && !error.value && consumerSpaces.length === 0 && (
            <div>Testing</div>
          )}
          {!isLoading && error.value && (
            <div className={classes.center_container}> {error.message}</div>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default ConsumerView;
