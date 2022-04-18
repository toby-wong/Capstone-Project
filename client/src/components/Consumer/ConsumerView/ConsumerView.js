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
import MessageModal from "../../UI/MessageModal/MessageModal";
import SubModalContext from "../../../contexts/submodal-context";
import ConsumerModalContext from "../../../contexts/consumer-modal-context";

const ConsumerView = () => {
  const authContext = useContext(AuthContext);
  const subModalContext = useContext(SubModalContext);
  const consumerModalContext = useContext(ConsumerModalContext);

  const [error, setError] = useState({ value: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [center, setCenter] = useState([-33.9139982, 151.2418546]);
  const [zoom, setZoom] = useState(17);
  const [queryResults, setQueryResults] = useState([]);

  const searchHandler = async (formData) => {
    try {
      setError({
        value: false,
        message: "",
      });

      consumerModalContext.setSearchDate({
        startDate: formData.startDateTime,
        endDate: formData.endDateTime,
      });

      const data = await utility.searchCarSpace(formData, setIsLoading);
      if (data.length === 0) {
        setQueryResults([]);
        setError({
          value: true,
          message: "No matching place found.",
        });
        return;
      }

      setQueryResults(data);
    } catch (e) {
      setError({
        value: true,
        message: config.NETWORK_ERROR_MESSAGE,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authContext.searchInfo) return;

        consumerModalContext.setSearchDate({
          startDate: authContext.searchInfo.startDateTime,
          endDate: authContext.searchInfo.endDateTime,
        });

        const data = await utility.searchCarSpace(
          authContext.searchInfo,
          setIsLoading
        );
        if (data.length === 0) {
          setError({
            value: true,
            message: "No matching place found.",
          });
          return;
        }

        setQueryResults(data);
      } catch (e) {
        setError({
          value: true,
          message: config.NETWORK_ERROR_MESSAGE,
        });
      }
    };

    fetchData();
  }, [authContext, setIsLoading]);

  return (
    <div className={classes.bodyContainer}>
      <MessageModal
        open={subModalContext.isOpen}
        onClose={subModalContext.closeModal}
        title={subModalContext.content.title}
        messages={subModalContext.content.messages}
        actions={subModalContext.content.actions}
      />
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
          <CarSpaceSearchBar
            initialState={authContext.searchInfo}
            onSubmit={searchHandler}
          />
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

            {!isLoading &&
              !error.value &&
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
            queryResults.map((item) => (
              <MapPointObject
                key={item.pk}
                id={item.pk}
                longitude={item.longitude}
                latitude={item.latitude}
                streetAddress={item.streetAddress}
              />
            ))}
          {!isLoading && error.value && (
            <div className={classes.center_container}> {error.message}</div>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default ConsumerView;
