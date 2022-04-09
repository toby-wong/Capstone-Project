import React, { useState } from "react";

const CarSpaceModalContext = React.createContext({
  carSpaceId: null,
  page: "",
  isOpen: false,
  openPage: () => {},
  closeModal: () => {},
});

export const CarSpaceModalContextProvider = (props) => {
  const [carSpaceId, setCarSpaceId] = useState("");
  const [page, setPage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const contextValue = {
    carSpaceId,
    page,
    isOpen,
    openPage,
    closeModal,
  };

  return (
    <CarSpaceModalContext.Provider value={contextValue}>
      {props.children}
    </CarSpaceModalContext.Provider>
  );
};

export default CarSpaceModalContext;
