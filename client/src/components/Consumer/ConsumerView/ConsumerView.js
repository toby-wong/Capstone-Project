import classes from "./ConsumerView.module.css";

import { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MapContainer, TileLayer } from "react-leaflet";

import * as utility from "../../../utility";
import * as config from "../../../config";

import AuthContext from "../../../contexts/auth-context";

import { Typography, Divider, CircularProgress } from "@mui/material";

import ConsumerMapItem from "./ConsumerMapItem";
import MapPointObject from "./MapPointObject";
import CarSpaceSearchBar from "../../UI/CarSpaceUI/CarSpaceSearchBar/CarSpaceSearchBar";

const ConsumerView = ({ anonymous = false }) => {
  const authContext = useContext(AuthContext);

  const [error, setError] = useState({ value: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [consumerSpaces, setConsumerSpaces] = useState([]);
  const [center, setCenter] = useState([-33.9139982, 151.2418546]);
  const [zoom, setZoom] = useState(17);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const filterSearchResults = (e) => {
    const filteredResults = consumerSpaces.filter((carSpace) =>
      carSpace.streetAddress.includes(e.target.value)
    );
    setQuery(e.target.value);
    setQueryResults(filteredResults);
  };

  const searchHandler = async (formData) => {
    try {
      console.log(formData);
      const data = await utility.searchCarSpace(formData, setIsLoading);
      filterSearchResults(data);
      console.log(data);
    } catch (e) {
      setError({
        value: true,
        message: "No matching place found.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!anonymous) return;

        const data = await utility.searchCarSpace(
          authContext.searchInfo,
          setIsLoading
        );
        setConsumerSpaces(data);
      } catch (e) {
        setError({
          value: true,
          message: config.NETWORK_ERROR_MESSAGE,
        });
      }
    };

    fetchData();
  }, [authContext, anonymous, setIsLoading]);

  return (
    <div className={classes.bodyContainer}>
      <div className={classes.menuContainer}>
        <Typography
          variant="modalTitle"
          className={classes.title}
          color="textSecondary"
          fontWeight="Bold"
        >
          Car Space Search
        </Typography>
        <div className={classes.interactionSection}>
          <CarSpaceSearchBar onSubmit={searchHandler} />
          <Divider
            orientation="horizontal"
            className={classes.navbar_divider_listingStart}
          />
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
