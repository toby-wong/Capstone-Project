import React, { useState } from "react";

const ProviderModalContext = React.createContext({
  page: "",
  carSpaceId: null,
  carSpaceInfo: { images: [], fetched: false },
  isOpen: false,
  carSpacesRefreshStatus: false,
  toggleCarSpacesRefreshStatus: () => {},
  openPage: () => {},
  closeModal: () => {},
  fetchCarSpaceInfo: () => {},
});

export const ProviderModalContextProvider = (props) => {
  const [carSpaceInfo, setCarSpaceInfo] = useState({
    images: [],
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
    <ProviderModalContext.Provider value={contextValue}>
      {props.children}
    </ProviderModalContext.Provider>
  );
};

export default ProviderModalContext;
