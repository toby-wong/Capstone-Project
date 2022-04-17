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
  const [externalModalContext, setExternalModalContext] = useState(null);

  const closeModal = () => {
    setIsOpen(false);

    if (externalModalContext) externalModalContext.closeModal();

    setExternalModalContext(null);
    setContent({ title: "", messages: [], actions: [] });
  };

  const closeAllModals = (context) => {
    return () => {
      setIsOpen(false);
      context.closeModal();
    };
  };

  const openModal = ({ title, messages, actions, context = null }) => {
    setIsOpen(true);
    setContent({ title, messages, actions });

    if (context) setExternalModalContext(context);
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
