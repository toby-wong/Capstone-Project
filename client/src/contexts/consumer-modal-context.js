import React, { useState } from "react";

const ConsumerModalContext = React.createContext({
  page: "",
  favourite: { id: null, value: false },
  carSpaceId: "",
  carSpaceInfo: { images: [], fetched: false },
  isOpen: false,
  pageRefreshStatus: false,
  togglePageRefreshStatus: () => {},
  openPage: () => {},
  closeModal: () => {},
  fetchCarSpaceInfo: () => {},
  setFavourite: () => {},
});

export const ConsumerModalContextProvider = (props) => {
  const [page, setPage] = useState("");
  const [carSpaceInfo, setCarSpaceInfo] = useState({
    images: [],
    fetched: false,
  });
  const [carSpaceId, setCarSpaceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);
  const [favourite, setFavourite] = useState({ id: null, value: false });

  const openPage = (path, csId = null) => {
    if (!isOpen) setIsOpen(true);
    setPage(path);

    if (!csId) return;
    setCarSpaceId(csId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const togglePageRefreshStatus = () => {
    setPageRefreshStatus((prev) => !prev);
  };

  const fetchCarSpaceInfo = (info) => {
    setCarSpaceInfo({ ...info, fetched: true });
  };

  const contextValue = {
    page,
    favourite,
    carSpaceId,
    carSpaceInfo,
    isOpen,
    pageRefreshStatus,
    fetchCarSpaceInfo,
    openPage,
    closeModal,
    togglePageRefreshStatus,
    setFavourite,
  };

  return (
    <ConsumerModalContext.Provider value={contextValue}>
      {props.children}
    </ConsumerModalContext.Provider>
  );
};

export default ConsumerModalContext;
