import classes from "./Provider.module.css";

import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ProviderListView from "./ProviderListView/ProviderListView";
import ProviderMapView from "./ProviderMapView/ProviderMapView";
import { CarSpaceModalContextProvider } from "../../contexts/carspace-modal-context";

/*
  1. Review Modal - reviews of a parking space
  2. History Modal - list of parking space usages
  3. Edit Modal - transition from display to edit
  4. Link with Backend
  
  + Error handling not implemented on Provider List view rendering
*/
const Provider = () => {
  return (
    <CarSpaceModalContextProvider>
      <div className={classes.body}>
        <CarSpaceModal />
        <Routes>
          <Route path="listView/active/*" element={<ProviderListView />} />
          <Route path="mapView/active/*" element={<ProviderMapView />} />
        </Routes>
      </div>
    </CarSpaceModalContextProvider>
  );
};

export default Provider;
