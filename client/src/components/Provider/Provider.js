import classes from "./Provider.module.css";

import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ProviderListView from "./ProviderListView/ProviderListView";
import ProviderMapView from "./ProviderMapView/ProviderMapView";
import { CarSpaceModalContextProvider } from "../../contexts/carspace-modal-context";

const Provider = () => {
  return (
    <CarSpaceModalContextProvider>
      <div className={classes.body}>
        <CarSpaceModal />
        <Routes>
          <Route path="listView/active/*" element={<ProviderListView />} />
          <Route
            path="listView/pending/*"
            element={<ProviderListView pending={true} />}
          />
          <Route path="mapView/active/*" element={<ProviderMapView pending={false}/>} />
          <Route
            path="mapView/pending/*"
            element={<ProviderMapView pending={true} />}
          />
        </Routes>
      </div>
    </CarSpaceModalContextProvider>
  );
};

export default Provider;
