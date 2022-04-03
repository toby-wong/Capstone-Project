import ProviderListView from "./ProviderListView";
import ProviderMapView from "./ProviderMapView";
import { Route, Routes } from "react-router-dom";

const Provider = () => {
  return (
	<Routes>
		<Route path="listView/active" element={<ProviderListView />} />
		<Route path="mapView/active" element={<ProviderMapView />} />
	</Routes>
   
  )
};

export default Provider;
