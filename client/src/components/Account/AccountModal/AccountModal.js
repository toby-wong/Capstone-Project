import { useContext } from "react";
import AccountModalContext from "../../../contexts/account-modal-context";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import AddCarForm from "./AddCarForm/AddCarForm";

const AccountModal = () => {
  const accountModalContext = useContext(AccountModalContext);

  return (
    <GeneralModal
      open={accountModalContext.isOpen}
      onClose={accountModalContext.closeModal}
      size={accountModalContext.modalSize}
    >
      {accountModalContext.page === "/addCar" && <AddCarForm />}
    </GeneralModal>
  );
};

export default AccountModal;
