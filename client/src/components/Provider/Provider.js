import classes from "./Provider.module.css";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ProviderListView from "./ProviderListView";
import ProviderMapView from "./ProviderMapView";

/*
  1. Review Modal - reviews of a parking space
  2. History Modal - list of parking space usages
  3. Edit Modal - transition from display to edit
  4. Link with Backend
*/
const Provider = () => {
  const [modalPage, setModalPage] = useState("");
  const [carSpaceModalOpen, setCarSpaceModalOpen] = useState(false);

  const carSpaceModalCloseHandler = () => {
    setCarSpaceModalOpen(false);
  };

  const addCarSpaceHandler = () => {
    setModalPage("/add");
    setCarSpaceModalOpen(true);
  };

  const displayCarSpaceHandler = (carSpaceId) => {
    setModalPage(`/info/${carSpaceId}`);
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
          path="listView/active/*"
          element={
            <ProviderListView
              onAdd={addCarSpaceHandler}
              // onClickItem={displayCarSpaceHandler}
            />
          }
        />
        <Route path="mapView/active/*" element={<ProviderMapView />} />
      </Routes>
    </div>
  );
};

export default Provider;
