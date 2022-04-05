import classes from "./ProviderListView.module.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../../contexts/auth-context";

import {
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MapIcon from "@mui/icons-material/Map";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ArchiveIcon from "@mui/icons-material/Archive";

import { sendRequest } from "../../utility";
import * as config from "../../config";

const ProviderListView = ({ onAdd }) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const activeTabView = location.pathname.split("/")[2] ?? false;
  const activeTabListings = location.pathname.split("/")[3] ?? false;
  // prettier-ignore
  const pendingUrl = `${location.pathname.split("/").slice(0, 3).join("/")}/pending`;
  // prettier-ignore
  const activeUrl = `${location.pathname.split("/").slice(0, 3).join("/")}/active`;

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        console.log(response);
      } catch (e) {
        console.log("error");
      }
    };

    fetchData();
  }, []);

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
          {!isLoading && (
            <div className={classes.listItem}>
              <div className={classes.listItem__content}>
                <div className={classes.listItem__content__main}>
                  <Typography variant="sectionSubTitle">
                    <span className={classes.descriptor}>Garage</span> on Wharf
                    Street
                  </Typography>
                  <Typography
                    variant="sectionContent"
                    className={classes.listItem__content__description}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis
                    aliquet dui sodales porta. Mauris lobortis mollis ligula
                    quis ultrices. Sed a posuere risus. Quisque ultrices mi ut
                    sodales commodo. Etiam at libero consequat nulla gravida
                    tempus. Sed a posuere risus.
                  </Typography>
                </div>
                <div className={classes.listItem__content__details}>
                  <div className={classes.distance}>
                    <DirectionsWalkIcon className={classes.walkIcon} />
                    <Typography variant="sectionSubContent">50km</Typography>
                  </div>
                  <div className={classes.capacity_rate}>
                    <Typography
                      variant="sectionContent"
                      className={classes.capacity}
                    >
                      Fits an SUV
                    </Typography>
                    <Typography
                      color="primary"
                      variant="sectionContent"
                      className={classes.rate}
                    >
                      $25.00
                    </Typography>
                  </div>
                </div>
              </div>
              <img
                className={classes.listItem__image}
                alt="parking at Sydney1"
                src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"
              />
            </div>
          )}
        </Paper>
      </Paper>
    </Paper>
  );
};

export default ProviderListView;
