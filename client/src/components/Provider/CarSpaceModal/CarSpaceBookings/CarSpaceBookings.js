import classes from "./CarSpaceBookings.module.css";

import { useContext, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

import CarSpaceModalContext from "../../../../contexts/carspace-modal-context";
import CarSpaceCardContent from "../CarSpaceCard/CarSpaceCardContent";
import CarSpaceCardHeader from "../CarSpaceCard/CarSpaceCardHeader";
import GeneralDataGrid from "../../../UI/DataGrid/GeneralDataGrid";

import * as config from "../../../../config";
import { sendRequest } from "../../../../utility";

const CarSpaceBookings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });
  const [bookings, setBookings] = useState([]);
  const carSpaceModalContext = useContext(CarSpaceModalContext);

  const backToCarSpaceInfoHandler = () => {
    carSpaceModalContext.openPage("/info");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/provider/parking/bookings/${carSpaceModalContext.carSpaceId}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        const fecthedBookings = [];
        for (const booking of response.data) {
          fecthedBookings.push({
            id: booking.pk,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.totalCost,
            consumer: booking.consumerName,
            vehicle: booking.parkingSpaceSize,
          });
        }
        console.log(fecthedBookings);
        setBookings(fecthedBookings);
      } catch (e) {
        console.log(e.message);
        setError({
          value: true,
          message: config.NETWORK_ERROR_MESSAGE,
        });
      }
    };

    fetchData();
  }, [carSpaceModalContext.carSpaceId]);

  return (
    <div className={classes.body}>
      <CarSpaceCardHeader
        title="Bookings"
        onClose={carSpaceModalContext.closeModal}
        onBack={backToCarSpaceInfoHandler}
      />
      <CarSpaceCardContent>
        {isLoading && (
          <div className={classes["center-container"]}>
            <CircularProgress className={classes.spinner} />
          </div>
        )}
        {!isLoading && !error.value && (
          <GeneralDataGrid
            rows={bookings}
            columns={[
              {
                field: "startTime",
                headerName: "Start Time",
                flex: 1,
              },
              {
                field: "endTime",
                headerName: "End Time",
                flex: 1,
              },
              {
                field: "cost",
                headerName: "Cost",
                flex: 1,
              },
              {
                field: "consumer",
                headerName: "Consumer",
                flex: 1,
              },
              {
                field: "vehicle",
                headerName: "Vehicle Size",
                flex: 1,
              },
            ]}
            rowsPerPageOptions={[5, 10]}
          />
        )}
        {!isLoading && error.value && (
          <div className={classes["center-container"]}>{error.message}</div>
        )}
      </CarSpaceCardContent>
    </div>
  );
};

export default CarSpaceBookings;
