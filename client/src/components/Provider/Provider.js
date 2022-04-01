import { Button, collapseClasses, Paper, Tab, Typography } from "@mui/material";
import classes from "./Provider.module.css";
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Provider = () => {
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
				maxWidth: "100px",
				maxHeight: "50px",
				minWidth: "100px",
				minHeight: "50px",
				borderRadius: 11
			  }}
			// onClick={addSpaceHandler}
		>
		+ Add
		</Button>
	</div>
	<div class={classes.mainContainer}>
		<Paper class={classes.viewsMenu}>
			<Tab class={classes.viewType}
				to="listView"
				value="listView"
				label="List View">
					List View
			</Tab>
			<Tab class={classes.viewType}
				to="mapView"
				value="mapView"
				label="Map View">
					Map View
			</Tab>
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
								<DirectionsWalkIcon/> 50km
							</div>
							<div class={classes.rate}>
								$20.00/hr
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
						<span class={classes.descriptor}>Parking</span> on Kensington Avenue
					</Typography>
					<div class={classes.description}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae vehicula ante, eu laoreet orci. Cras eu turpis aliquet dui sodales porta. Mauris lobortis mollis ligula quis ultrices. Sed a posuere risus. Quisque ultrices mi ut sodales commodo. Etiam at libero consequat nulla gravida tempus. Praesent pulvinar consectetur justo, sed varius lectus facilisis fringilla. Nunc maximus porttitor augue et vulputate. Maecenas hendrerit risus scelerisque est dapibus dictum sed at orci. Sed ligula nunc, pharetra et turpis quis, consectetur fermentum lectus.
					</div>
					<div class={classes.infoBar}>
						<div class={classes.distance}>
							<DirectionsWalkIcon/> 10km
						</div>
						<div class={classes.rate}>
							$30.00/hr
						</div>
					</div>
				</div>
				<div class={classes.imageSection}>
					<img class={classes.imageEntry} alt="parking at Sdyney2" src="https://www.goget.com.au/wp-content/uploads/Screen-Shot-2016-02-29-at-10.29.16-AM.png"/>
				</div>
			</div>
			<MapContainer center={[51.505, -0.09]} zoom={13}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	</div>
   </div>
  )
};

export default Provider;
