import classes from "./Favourites.module.css";

import { Typography, Paper, CircularProgress, Button } from "@mui/material";

import { useContext, useEffect, useState } from "react";

import { sendRequest } from "../../../utility";
import * as config from "../../../config";
import GeneralDataGrid from "../../UI/GeneralDataGrid/GeneralDataGrid";
import AccountModalContext from "../../../contexts/account-modal-context";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    value: false,
    message: "",
  });
  const [favSpots, setFavSpots] = useState([]);
  const accountModalContext = useContext(AccountModalContext);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("parkItAuthToken");

      try {
        const url = `${config.SERVER_URL}/api/consumer/favourite/all`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        const favSpots = [];
        for (const car of response.data) {
          favSpots.push({
            startTime: car.startTime,
            endTime: car.endTime,
            id: car.pk,
            carSpaceId: car.parkingSpace,
            cost: car.totalCost,
            streetAddress: car.streetAddress,
            vehicle: car.parkingSpaceSize,
          });
        }
        console.log(favSpots);
        setFavSpots(favSpots);
      } catch (e) {
        setError({ value: true, message: config.NETWORK_ERROR_MESSAGE });
      }
    };
    fetchData();
  }, [accountModalContext.pageRefreshStatus]);

  const clickCarRowHandler = (rowData) => {
    accountModalContext.setContent(rowData.row);
    accountModalContext.openPage("/favourite", "small");
  };

  return (
    <>
      <div className={classes.header}>
        <Typography variant="sectionTitle">Favourite Car Spots</Typography>
      </div>
      <Paper variant="accountSectionContent">
        {isLoading && <CircularProgress style={{ color: "var(--green)" }} />}
        {!isLoading && !error.value && (
          <GeneralDataGrid
            rows={favSpots}
            columns={[
              {
                field: "startTime",
                headerName: "Available From",
                flex: 1,
              },
              {
                field: "endTime",
                headerName: "Available To",
                flex: 1,
              },
              {
                field: "streetAddress",
                headerName: "Address",
                flex: 1,
              },
              {
                field: "cost",
                headerName: "Cost",
                flex: 1,
              },
              {
                field: "vehicle",
                headerName: "Car Space Size",
                flex: 1,
              },
            ]}
            rowsPerPageOptions={[5, 10]}
            onRowClick={clickCarRowHandler}
          />
        )}
        {!isLoading && error.value && error.message}
      </Paper>
    </>
  );
};

export default Favourites;
