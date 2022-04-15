import { Typography, Paper, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import * as config from "../../../config";
import { sendRequest } from "../../../utility";
import GeneralDataGrid from "../../UI/GeneralDataGrid/GeneralDataGrid";

const ProviderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("parkItAuthToken");
      if (!authToken) return;

      try {
        const url = `${config.SERVER_URL}/api/provider/history`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
          },
        };
        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        const fetchedHistory = [];
        for (const booking of response.data) {
          fetchedHistory.push({
            id: booking.pk,
            startTime: booking.startTime,
            endTime: booking.endTime,
            cost: booking.totalCost,
            streetAddress: booking.streetAddress,
            vehicle: booking.parkingSpaceSize,
            consumer: booking.consumerName,
          });
        }

        setHistory(fetchedHistory);
      } catch (e) {
        console.log(e.message);
        setError({ value: true, message: config.NETWORK_ERROR_MESSAGE });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="sectionTitle">Provider History</Typography>
      <Paper variant="accountSectionContent">
        {isLoading && (
          <CircularProgress style={{ color: "var(--green)" }} size="3rem" />
        )}
        {!isLoading && !error.value && (
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
                field: "streetAddress",
                headerName: "Car Space",
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
                    field: "startTime",
                    sort: "desc",
                  },
                ],
              },
            }}
          />
        )}
        {!isLoading && error.message}
      </Paper>
    </>
  );
};

export default ProviderHistory;
