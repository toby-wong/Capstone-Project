import React, { useState } from "react";

const CarSpaceModalContext = React.createContext({
  carSpaceId: null,
  page: "",
  carSpaceInfo: { images: [] },
  isOpen: false,
  carSpacesRefreshStatus: false,
  toggleCarSpacesRefreshStatus: () => {},
  openPage: () => {},
  closeModal: () => {},
  setCarSpaceInfo: () => {},
});

export const CarSpaceModalContextProvider = (props) => {
  const [carSpaceInfo, setCarSpaceInfo] = useState({ iamges: [] });
  const [carSpaceId, setCarSpaceId] = useState("");
  const [page, setPage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [carSpacesRefreshStatus, setCarSpacesRefreshStatus] = useState(false);

  const openPage = (path, csId = null) => {
    if (!isOpen) setIsOpen(true);
    setPage(path);

    if (!csId) return;
    setCarSpaceId(csId);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPage("");
  };

  const toggleCarSpacesRefreshStatus = () => {
    setCarSpacesRefreshStatus(!carSpacesRefreshStatus);
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
    setCarSpaceInfo,
  };

  return (
    <CarSpaceModalContext.Provider value={contextValue}>
      {props.children}
    </CarSpaceModalContext.Provider>
  );
};

export default CarSpaceModalContext;
