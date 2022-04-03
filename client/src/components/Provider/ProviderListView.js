import { Button, Paper, Tab, Tabs, Typography, Divider} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import classes from "./Provider.module.css";

// Imports for icons used
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MapIcon from '@mui/icons-material/Map';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ArchiveIcon from '@mui/icons-material/Archive';

const ProviderListView = () => {
    const location = useLocation();
    const activeTab = location.pathname.split("/").slice(2).join("/");
    console.log("Here is activeTab")
    console.log(activeTab)
  
    return (
    <div class={classes.body}>
	<div class={classes.titleDiv}>
		<Typography
			className={classes.title}
			variant="modalTitle"
			color="textSecondary"
			fontWeight="Bold"
		>
          Your Car Spaces
        </Typography>
		<Button
			className={classes.button}
			color="primary"
			variant="contained"
			size="large"
			style={{
				borderRadius: 15
			  }}
			// onClick={addSpaceHandler}
		>
		+ Add
		</Button>
	</div>
	<div class={classes.mainContainer}>
        <Paper className={classes.viewsMenu} elevation={5}>
            <Tabs
            value={activeTab}
            orientation="vertical"
            >
                <Tab
                    className={classes.menu__tab}
                    component={Link}
                    to="/provider/listView/active"
                    value="listView"
                    label="List View"
                    icon={<ListAltIcon className={classes["tab-icon"]} />}
                    iconPosition="start"
                />

                <Tab
                    className={classes.menu__tab}
                    component={Link}
                    to="/provider/mapView/active"
                    value="mapView"
                    label="Map View"
                    icon={<MapIcon className={classes["tab-icon"]} />}
                    iconPosition="start"
                />
            </Tabs>
            <Divider sx={{ my: 1 }} />
            <Tabs
            value={activeTab}
            orientation="vertical"
            >
                <Tab
                    className={classes.menu__tab}
                    component={Link}
                    to="active"
                    value="activeListings"
                    label="Active Listings"
                    icon={<BeenhereIcon className={classes["tab-icon"]} />}
                    iconPosition="start"
                />

                <Tab
                    className={classes.menu__tab}
                    component={Link}
                    to=""
                    value="Pending Listings"
                    label="Pending Listings"
                    icon={<ArchiveIcon className={classes["tab-icon"]} />}
                    iconPosition="start"
                />
            </Tabs>

        </Paper>
		<div class={classes.listingsContainer}>
			<div class={classes.listing}>
                <div class={classes.lhs}>
                    <Typography variant="sectionTitle">
                        <span class={classes.descriptor}>Garage</span> on Wharf Street
                    </Typography>
                    <div class={classes.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.
                    </div>
                    <div class={classes.infoBar}>
                        <div class={classes.distance}>
                            <DirectionsWalkIcon className={classes.walkIcon}/> 50km
                        </div>
                        <div class={classes.capacity_rate}>
                            <div class={classes.capacity}>
                                Fits an SUV
                            </div>
                            <div class={classes.rate}>
                                $25.00
                            </div>
                        </div>
                    </div>
                </div>
                <div class={classes.imageSection}>
                    <img class={classes.imageEntry}  alt="parking at Sydney1" src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"/>
                </div>
			</div>
			<div class={classes.listing}>
                <div class={classes.lhs}>
                    <Typography variant="sectionTitle">
                        <span class={classes.descriptor}>Garage</span> on Wharf Street
                    </Typography>
                    <div class={classes.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.
                    </div>
                    <div class={classes.infoBar}>
                        <div class={classes.distance}>
                            <DirectionsWalkIcon className={classes.walkIcon}/> 50km
                        </div>
                        <div class={classes.capacity_rate}>
                            <div class={classes.capacity}>
                                Fits an SUV
                            </div>
                            <div class={classes.rate}>
                                $25.00
                            </div>
                        </div>
                    </div>
                </div>
                <div class={classes.imageSection}>
                    <img class={classes.imageEntry}  alt="parking at Sydney1" src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"/>
                </div>
			</div>
		</div>
	</div>
   </div>
  )
};

export default ProviderListView;




