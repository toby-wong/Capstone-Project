import classes from "./ProviderListView.module.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../../contexts/auth-context";

import {
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MapIcon from "@mui/icons-material/Map";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ArchiveIcon from "@mui/icons-material/Archive";

import { sendRequest } from "../../../utility";
import * as config from "../../../config";
import ProviderListItem from "./ProviderListItem";

/*
  1. Create Seperate Component for ProviderListViewItem
  2. Get data from backend and redner the above component using the data from backend
*/
const ProviderListView = ({ onAdd, onClickItem }) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [carSpaces, setCarSpaces] = useState([]);

  const activeTabView = location.pathname.split("/")[2] ?? false;
  const activeTabListings = location.pathname.split("/")[3] ?? false;
  // prettier-ignore
  const pendingUrl = `${location.pathname.split("/").slice(0, 3).join("/")}/pending`;
  // prettier-ignore
  const activeUrl = `${location.pathname.split("/").slice(0, 3).join("/")}/active`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authContext.userInfo) return;

        const authToken = localStorage.getItem("parkItAuthToken");
        const url = `${config.SERVER_URL}/api/provider/${authContext.userInfo.pk}/parking`;
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
            "Content-Type": "application/json",
          },
        };

        const response = await sendRequest(url, options, setIsLoading);
        if (response.status >= 300 || !response.status) throw Error;

        setCarSpaces(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchData();
  }, [authContext.userInfo]);

  return (
    <Paper variant="sectionBody">
      <div className={classes["navbar-container"]}>
        <Tabs
          value={activeTabView}
          orientation="vertical"
          className={classes.navbar}
        >
          <Tab
            className={classes.navbar__tab}
            variant="sideMenu"
            component={Link}
            to="/provider/listView/active"
            value="listView"
            label="List View"
            icon={<ListAltIcon className={classes["tab-icon"]} />}
            iconPosition="start"
          />

          <Tab
            className={classes.navbar__tab}
            variant="sideMenu"
            component={Link}
            to="/provider/mapView/active"
            value="mapView"
            label="Map View"
            icon={<MapIcon className={classes["tab-icon"]} />}
            iconPosition="start"
          />
        </Tabs>
        <Divider sx={{ my: 1 }} className={classes["navbar-divider"]} />
        <Tabs
          value={activeTabListings}
          orientation="vertical"
          className={classes.navbar}
        >
          <Tab
            className={classes.navbar__tab}
            variant="sideMenu"
            component={Link}
            to={activeUrl}
            value="active"
            label="Active Listings"
            icon={<BeenhereIcon className={classes["tab-icon"]} />}
            iconPosition="start"
          />

          <Tab
            className={classes.navbar__tab}
            variant="sideMenu"
            component={Link}
            to={pendingUrl}
            value="pending"
            label="Pending Listings"
            icon={<ArchiveIcon className={classes["tab-icon"]} />}
            iconPosition="start"
          />
        </Tabs>
      </div>
      <Paper variant="sectionContent">
        <div className={classes.sectionContent__title}>
          <Typography variant="sectionTitle">Your Car Spaces</Typography>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={onAdd}
          >
            Add Car Space
          </Button>
        </div>
        <Paper
          variant="sectionContentBody"
          className={classes.sectionContent__body}
        >
          {isLoading && (
            <div className={classes["spinner-container"]}>
              <CircularProgress className={classes.spinner} />
            </div>
          )}
          {!isLoading &&
            carSpaces.map((item) => (
              <ProviderListItem
                key={item.pk}
                id={item.pk}
                streetAddress={item.streetAddress}
                notes={item.notes}
                size={item.size}
                price={item.price}
                onClick={onClickItem}
              />
            ))}
        </Paper>
      </Paper>
    </Paper>
  );
};

export default ProviderListView;
