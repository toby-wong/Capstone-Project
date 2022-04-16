import React, { useState } from "react";

const ConsumerModalContext = React.createContext({
  page: "",
  carSpaceId: "",
  content: {},
  isOpen: false,
  pageRefreshStatus: false,
  setContent: () => {},
  openPage: () => {},
  closeModal: () => {},
  togglePageRefreshStatus: () => {},
});

export const ConsumerModalContextProvider = (props) => {
  const [page, setPage] = useState("");
  const [content, setContent] = useState({});
  const [carSpaceId, setCarSpaceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);

  const openPage = (path, id) => {
    if (!isOpen) setIsOpen(true);

    if (path === "/info") setCarSpaceId(id);
    setPage(path);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const togglePageRefreshStatus = () => {
    setPageRefreshStatus((prev) => !prev);
  };

  const contextValue = {
    page,
    carSpaceId,
    content,
    isOpen,
    pageRefreshStatus,
    setContent,
    openPage,
    closeModal,
    togglePageRefreshStatus,
  };

  return (
    <ConsumerModalContext.Provider value={contextValue}>
      {props.children}
    </ConsumerModalContext.Provider>
  );
};

export default ConsumerModalContext;
