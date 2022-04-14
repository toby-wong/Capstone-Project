import React, { useState } from "react";

const AccountModalContext = React.createContext({
  page: "",
  isOpen: false,
  pageRefreshStatus: false,
  modalSize: "",
  togglePageRefreshStatus: () => {},
  openPage: () => {},
  closeModal: () => {},
});

export const AccountModalContextProvider = (props) => {
  const [page, setPage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [pageRefreshStatus, setPageRefreshStatus] = useState(false);
  const [modalSize, setModalSize] = useState("large");

  const resetContextValue = () => {
    setPage("");
  };

  const openPage = (path, modalSize = "large") => {
    if (!isOpen) setIsOpen(true);
    setPage(path);
    setModalSize(modalSize);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetContextValue();
  };

  const togglePageRefreshStatus = () => {
    setPageRefreshStatus(!pageRefreshStatus);
  };

  const contextValue = {
    page,
    isOpen,
    pageRefreshStatus,
    modalSize,
    togglePageRefreshStatus,
    openPage,
    closeModal,
  };

  return (
    <AccountModalContext.Provider value={contextValue}>
      {props.children}
    </AccountModalContext.Provider>
  );
};

export default AccountModalContext;
