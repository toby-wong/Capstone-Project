import classes from "./Provider.module.css";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ProviderListView from "./ProviderListView";
import ProviderMapView from "./ProviderMapView";

const Provider = () => {
  const [carSpaceModalOpen, setCarSpaceModalOpen] = useState(false);

  const carSpaceModalCloseHandler = () => {
    setCarSpaceModalOpen(false);
  };

  return (
    <div className={classes.body}>
      <CarSpaceModal
        open={carSpaceModalOpen}
        onClose={carSpaceModalCloseHandler}
      />
      <Routes>
        <Route path="listView/active" element={<ProviderListView />} />
        <Route path="mapView/active" element={<ProviderMapView />} />
      </Routes>
    </div>
  );
};

export default Provider;
