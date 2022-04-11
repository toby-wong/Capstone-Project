import classes from "./ProviderHistory.module.css";

import { Typography, Paper, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import * as config from "../../../config";
import { sendRequest } from "../../../utility";
import GeneralDataGrid from "../../UI/DataGrid/GeneralDataGrid";

const ProviderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [history, setHistory] = useState([]);

  const dummyHistory = [
    {
      id: 0,
      startTime: "04/01/2022 10:00",
      endTime: "05/01/2022 21:00",
      cost: 123,
      parkingSpace: 55,
      vehicle: "Sedan",
      consumer: "#Younggil",
    },
    {
      id: 1,
      startTime: "04/01/2022 10:00",
      endTime: "05/01/2022 21:00",
      cost: 135,
      parkingSpace: 55,
      vehicle: "Sedan",
      consumer: "#Younggil",
    },
    {
      id: 2,
      startTime: "21/01/2022 10:00",
      endTime: "28/01/2022 21:00",
      cost: 150,
      parkingSpace: 55,
      vehicle: "Sedan",
      consumer: "#Younggil",
    },
    {
      id: 3,
      startTime: "14/01/2022 10:00",
      endTime: "21/01/2022 21:00",
      cost: 125,
      parkingSpace: 55,
      vehicle: "Sedan",
      consumer: "#Younggil",
    },
    {
      id: 4,
      startTime: "04/12/2022 10:00",
      endTime: "05/12/2022 21:00",
      cost: 100,
      parkingSpace: 55,
      vehicle: "Sedan",
      consumer: "#Younggil",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("parkItAuthToken");
      if (!authToken) return;

      try {
        const url = `${config.SERVER_URL}/api/provider/history/`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
          },
        };
        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        const fetchedHistory = [];
        for (const booking of response.data.results) {
          fetchedHistory.push({
            id: booking.pk,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.cost,
            parkingSpace: booking.parkingSpace,
            vehicle: booking.vehicle,
            consumer: booking.consumer,
          });
        }

        setHistory(fetchedHistory);
      } catch (e) {
        setHistory(dummyHistory);

        console.log(e.message);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="sectionTitle">Provider History</Typography>
      <Paper elevation={0} className={classes.body}>
        {isLoading && (
          <CircularProgress className={classes.spinner} size="3rem" />
        )}
        {!isLoading && !error && (
          <GeneralDataGrid
            rows={history}
            columns={[
              {
                field: "startTime",
                headerName: "Start Time",
                width: 150,
              },
              {
                field: "endTime",
                headerName: "End Time",
                width: 150,
              },
              {
                field: "cost",
                headerName: "Cost",
                widht: 125,
              },
              {
                field: "parkingSpace",
                headerName: "Parking Space",
                flex: 1,
              },
              {
                field: "vehicle",
                headerName: "Vehicle Size",
                width: 130,
              },
              {
                field: "consumer",
                headerName: "Consumer",
                width: 150,
              },
            ]}
            rowsPerPageOptions={[5, 10]}
            initialState={{
              sorting: {
                sortModel: [
                  {
                    field: "rating",
                    sort: "desc",
                  },
                ],
              },
            }}
          />
        )}
        {!isLoading && error && config.NETWORK_ERROR_MESSAGE}
      </Paper>
    </>
  );
};

export default ProviderHistory;
