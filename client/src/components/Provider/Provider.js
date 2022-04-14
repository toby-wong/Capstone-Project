import classes from "./Provider.module.css";

import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ProviderListView from "./ProviderListView/ProviderListView";
import ProviderMapView from "./ProviderMapView/ProviderMapView";
import { CarSpaceModalContextProvider } from "../../contexts/carspace-modal-context";

/*
  Set a modal size: large, medium, small
*/
const Provider = () => {
  return (
    <CarSpaceModalContextProvider>
      <div className={classes.body}>
        <CarSpaceModal />
        <Routes>
          <Route
            path="listView/active/*"
            element={<ProviderListView status="approved" />}
          />
          <Route
            path="listView/pending/*"
            element={<ProviderListView status={"pending"} />}
          />
          <Route
            path="listView/rejected/*"
            element={<ProviderListView status={"rejected"} />}
          />
          <Route
            path="listView/cancelled/*"
            element={<ProviderListView status={"cancelled"} />}
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
