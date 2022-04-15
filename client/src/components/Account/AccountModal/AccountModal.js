import { useContext } from "react";

import AccountModalContext from "../../../contexts/account-modal-context";
import AccountSubModalContext from "../../../contexts/account-submodal-context";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import MessageModal from "../../UI/MessageModal/MessageModal";
import AddCarForm from "./AddCarForm/AddCarForm";
import EditCarForm from "./EditCarForm/EditCarForm";

const AccountModal = () => {
  const accountModalContext = useContext(AccountModalContext);
  const accountSubModalContext = useContext(AccountSubModalContext);

  return (
    <GeneralModal
      open={accountModalContext.isOpen}
      onClose={accountModalContext.closeModal}
      size={accountModalContext.modalSize}
    >
      <MessageModal
        open={accountSubModalContext.isOpen}
        onClose={accountSubModalContext.closeModal}
        title={accountSubModalContext.content.title}
        messages={accountSubModalContext.content.messages}
        actions={accountSubModalContext.content.actions}
      />
      {accountModalContext.page === "/addCar" && <AddCarForm />}
      {accountModalContext.page === "/editCar" && <EditCarForm />}
    </GeneralModal>
  );
};

export default AccountModal;
