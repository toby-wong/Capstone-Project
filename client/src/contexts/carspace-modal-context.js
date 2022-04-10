import React, { useState } from "react";

const CarSpaceModalContext = React.createContext({
  carSpaceId: null,
  page: "",
  carSpaceInfo: { images: [], fetched: false },
  isOpen: false,
  carSpacesRefreshStatus: false,
  toggleCarSpacesRefreshStatus: () => {},
  openPage: () => {},
  closeModal: () => {},
  fetchCarSpaceInfo: () => {},
});

export const CarSpaceModalContextProvider = (props) => {
  const [carSpaceInfo, setCarSpaceInfo] = useState({
    iamges: [],
    fetched: false,
  });
  const [carSpaceId, setCarSpaceId] = useState("");
  const [page, setPage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [carSpacesRefreshStatus, setCarSpacesRefreshStatus] = useState(false);

  const resetContextValue = () => {
    setCarSpaceInfo({ images: [], fetched: false });
    setCarSpaceId("");
    setPage("");
  };

  const openPage = (path, csId = null) => {
    if (!isOpen) setIsOpen(true);
    setPage(path);

    if (!csId) return;
    setCarSpaceId(csId);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetContextValue();
  };

  const toggleCarSpacesRefreshStatus = () => {
    setCarSpacesRefreshStatus(!carSpacesRefreshStatus);
  };

  const fetchCarSpaceInfo = (info) => {
    setCarSpaceInfo({ ...info, fetched: true });
  };

  const contextValue = {
    carSpaceInfo,
    carSpaceId,
    page,
    isOpen,
    carSpacesRefreshStatus,
    toggleCarSpacesRefreshStatus,
    openPage,
    closeModal,
    fetchCarSpaceInfo,
  };

  return (
    <CarSpaceModalContext.Provider value={contextValue}>
      {props.children}
    </CarSpaceModalContext.Provider>
  );
};

export default CarSpaceModalContext;
