import { Button, Paper, Tab, Tabs, Typography, Divider} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import classes from "./ProviderMapView.module.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Scrollbars } from 'react-custom-scrollbars-2';
import LinesEllipsis from 'react-lines-ellipsis'


// React Icon import
import ListAltIcon from '@mui/icons-material/ListAlt';
import MapIcon from '@mui/icons-material/Map';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ArchiveIcon from '@mui/icons-material/Archive';

const ProviderMapView = () => {
    const location = useLocation();
    const activeTab = location.pathname.split("/").slice(2).join("/");
  
    return (
    <div className={classes.body}>
        <div className={classes.mainContainer}>
            <Typography
                className={classes.title}
                variant="modalTitle"
                color="textSecondary"
                fontWeight="Bold"
            > Your Car Spaces </Typography>
            <div className={classes.menuContainer}>
                <Tabs
                    value={activeTab}
                    orientation="horizontal"
                    className={classes.tabContainer}
                    variant="scrollable"
                    scrollButtons={false}
                    >
                    <Tab
                        className={classes.menu__tab}
                        component={Link}
                        to="/provider/listView/active"
                        value="listView"
                        label="List"
                        icon={<ListAltIcon className={classes["tab-icon"]} />}
                        iconPosition="start"
                    />
                    <Tab
                        className={classes.menu__tab}
                        component={Link}
                        to="/provider/mapView/active"
                        value="mapView"
                        label="Map"
                        icon={<MapIcon className={classes["tab-icon"]} />}
                        iconPosition="start"
                    />
                    <Tab
                        className={classes.menu__tab}
                        component={Link}
                        to="/provider/mapView/active"
                        value="activeListings"
                        label="Active"
                        icon={<BeenhereIcon className={classes["tab-icon"]} />}
                        iconPosition="start"
                    />
                    <Tab
                        className={classes.menu__tab}
                        component={Link}
                        to="/provider/mapView/pending"
                        value="pendingListings"
                        label="Pending"
                        icon={<ArchiveIcon className={classes["tab-icon"]} />}
                        iconPosition="start"
                    />
                </Tabs>
            </div>
            <div className={classes.listingContainer}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={200}
                    autoHideDuration={500}
                    renderView={props => (
                        <div {...props} style={{ ...props.style, 
                            overflowX: 'hidden',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}/>
                    )}
                    renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="view"/>}
                >
                    <Paper className={classes.listing} elevation={5}>
                        <div className={classes.lhs}>
                            <Typography 
                                variant="sectionTitle"
                                style={{fontSize: "25px"}}>
                                <span className={classes.descriptor}>Sailor Bay Road</span>
                            </Typography>
                            <LinesEllipsis
                                className={classes.description}
                                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.'
                                maxLine='3'
                                ellipsis=' ... (See More)'
                                trimRight
                                basedOn='words'
                            ></LinesEllipsis>
                            <div className={classes.infoBar}>
                                <div className={classes.capacity_rate}>
                                    <div className={classes.capacity}>
                                        Fits an SUV
                                    </div>
                                    <div className={classes.rate}>
                                        $20.00 per hour
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.imageContainer}>
                            <img className={classes.imageEntry}  alt="parking at Sydney1" src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"/>
                        </div>
                    </Paper>
                    <Paper className={classes.listing} elevation={5}>
                        <div className={classes.lhs}>
                            <Typography 
                                variant="sectionTitle"
                                style={{fontSize: "25px"}}>
                                <span className={classes.descriptor}>Sailor Bay Road</span>
                            </Typography>
                            <LinesEllipsis
                                className={classes.description}
                                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.'
                                maxLine='3'
                                ellipsis=' ... (See More)'
                                trimRight
                                basedOn='words'
                            ></LinesEllipsis>
                            <div className={classes.infoBar}>
                                <div className={classes.capacity_rate}>
                                    <div className={classes.capacity}>
                                        Fits an SUV
                                    </div>
                                    <div className={classes.rate}>
                                        $20.00 per hour
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.imageContainer}>
                            <img className={classes.imageEntry}  alt="parking at Sydney1" src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"/>
                        </div>
                    </Paper>
                    <Paper className={classes.listing} elevation={5}>
                        <div className={classes.lhs}>
                            <Typography 
                                variant="sectionTitle"
                                style={{fontSize: "25px"}}>
                                <span className={classes.descriptor}>Sailor Bay Road</span>
                            </Typography>
                            <LinesEllipsis
                                className={classes.description}
                                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.'
                                maxLine='3'
                                ellipsis=' ... (See More)'
                                trimRight
                                basedOn='words'
                            ></LinesEllipsis>
                            <div className={classes.infoBar}>
                                <div className={classes.capacity_rate}>
                                    <div className={classes.capacity}>
                                        Fits an SUV
                                    </div>
                                    <div className={classes.rate}>
                                        $20.00 per hour
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.imageContainer}>
                            <img className={classes.imageEntry}  alt="parking at Sydney1" src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"/>
                        </div>
                    </Paper>
                    <Paper className={classes.listing} elevation={5}>
                        <div className={classes.lhs}>
                            <Typography 
                                variant="sectionTitle"
                                style={{fontSize: "25px"}}>
                                <span className={classes.descriptor}>Sailor Bay Road</span>
                            </Typography>
                            <LinesEllipsis
                                className={classes.description}
                                text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.'
                                maxLine='3'
                                ellipsis=' ... (See More)'
                                trimRight
                                basedOn='words'
                            ></LinesEllipsis>
                            <div className={classes.infoBar}>
                                <div className={classes.capacity_rate}>
                                    <div className={classes.capacity}>
                                        Fits an SUV
                                    </div>
                                    <div className={classes.rate}>
                                        $20.00 per hour
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.imageContainer}>
                            <img className={classes.imageEntry}  alt="parking at Sydney1" src="https://www.realestate.com.au/blog/images/550x350-fit,progressive/2016/03/space-body.jpg"/>
                        </div>
                    </Paper>
                </Scrollbars>
            </div>
        </div>
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
        Add Car Space
        </Button>
        <MapContainer 
            center={[-33.916663, 151.2420]} 
            zoomControl={false} 
            zoom={15} 
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-33.916663, 151.2420]}>
                <Popup>
                    Welcome to BMG HQ
                </Popup>
            </Marker>
        </MapContainer>
   </div>
  )
};

export default ProviderMapView;




