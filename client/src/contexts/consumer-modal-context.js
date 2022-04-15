import React, { useState } from "react";

const ConsumerModalContext = React.createContext({
  page: "",
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
  const [isOpen, setIsOpen] = useState(false);
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);

  const openPage = (path) => {
    setIsOpen(true);
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
