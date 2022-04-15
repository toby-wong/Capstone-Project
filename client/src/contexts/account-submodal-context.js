import React, { useState } from "react";

const AccountSubModalContext = React.createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  content: { title: "", messages: [], actions: [] },
});

export const AccountSubModalContextProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({
    title: "",
    messages: [],
    actions: [],
  });

  const openModal = ({ title, messages, actions }) => {
    setIsOpen(true);
    setContent({ title, messages, actions });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const contextValue = {
    isOpen,
    openModal,
    closeModal,
    content,
  };

  return (
    <AccountSubModalContext.Provider value={contextValue}>
      {props.children}
    </AccountSubModalContext.Provider>
  );
};

export default AccountSubModalContext;
