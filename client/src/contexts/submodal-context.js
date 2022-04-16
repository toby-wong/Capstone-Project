import React, { useState } from "react";

const SubModalContext = React.createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  closeAllModals: () => {},
  content: { title: "", messages: [], actions: [] },
});

export const SubModalContextProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({
    title: "",
    messages: [],
    actions: [],
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeAllModals = (context) => {
    return () => {
      closeModal(context);
      context.closeModal();
    };
  };

  const openModal = ({ title, messages, actions }) => {
    setIsOpen(true);
    setContent({ title, messages, actions });
  };

  const contextValue = {
    isOpen,
    openModal,
    closeModal,
    closeAllModals,
    content,
  };

  return (
    <SubModalContext.Provider value={contextValue}>
      {props.children}
    </SubModalContext.Provider>
  );
};

export default SubModalContext;
