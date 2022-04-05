import classes from "./Provider.module.css";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ProviderListView from "./ProviderListView";
import ProviderMapView from "./ProviderMapView";

const Provider = () => {
  const [modalPage, setModalPage] = useState("");
  const [carSpaceModalOpen, setCarSpaceModalOpen] = useState(false);

  const carSpaceModalCloseHandler = () => {
    setCarSpaceModalOpen(false);
  };

  const addCarSpaceHandler = () => {
    // setModalPage("/add");
    setModalPage("/item");
    setCarSpaceModalOpen(true);
  };

  return (
    <div className={classes.body}>
      <CarSpaceModal
        open={carSpaceModalOpen}
        onClose={carSpaceModalCloseHandler}
        page={modalPage}
        setPage={setModalPage}
      />
      <Routes>
        <Route
          path="listView/active"
          element={<ProviderListView onAdd={addCarSpaceHandler} />}
        />
        <Route path="mapView/active" element={<ProviderMapView />} />
      </Routes>
    </div>
  );
};

export default Provider;
