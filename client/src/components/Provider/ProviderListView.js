import { Button, Paper, Tab, Tabs, Typography, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import classes from "./ProviderListView.module.css";

// Imports for icons used
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MapIcon from "@mui/icons-material/Map";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ArchiveIcon from "@mui/icons-material/Archive";

const ProviderListView = ({ onAdd }) => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").slice(2).join("/");

  return (
    <Paper variant="sectionBody">
      <Tabs
        variant="sideMenu"
        value={activeTab}
        orientation="vertical"
        className={classes.navbar}
      >
        <Tab
          variant="sideMenu"
          component={Link}
          to="/provider/listView/active"
          value="listView"
          label="List View"
          icon={<ListAltIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />

        <Tab
          variant="sideMenu"
          component={Link}
          to="/provider/mapView/active"
          value="mapView"
          label="Map View"
          icon={<MapIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />
        <Divider sx={{ my: 1 }} />
        <Tab
          variant="sideMenu"
          component={Link}
          to="active"
          value="activeListings"
          label="Active Listings"
          icon={<BeenhereIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />

        <Tab
          variant="sideMenu"
          component={Link}
          to="pending"
          value="Pending Listings"
          label="Pending Listings"
          icon={<ArchiveIcon className={classes["tab-icon"]} />}
          iconPosition="start"
        />
      </Tabs>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet
                  dui sodales porta. Mauris lobortis mollis ligula quis
                  ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales
                  commodo. Etiam at libero consequat nulla gravida tempus. Sed a
                  posuere risus.
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
        </Paper>
      </Paper>
    </Paper>
  );
};

export default ProviderListView;
