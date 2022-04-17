import { useContext } from "react";

import AccountModalContext from "../../../contexts/account-modal-context";
import SubModalContext from "../../../contexts/submodal-context";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import MessageModal from "../../UI/MessageModal/MessageModal";
import AddCarForm from "./AddCarForm/AddCarForm";
import EditCarForm from "./EditCarForm/EditCarForm";
import ConsumerBookingInfo from "../../BookingInfo/ConsumerBookingInfo/ConsumerBookingInfo";
import ProviderBookingInfo from "../../BookingInfo/ProviderBookingInfo/ProviderBookingInfo";

const AccountModal = () => {
  const accountModalContext = useContext(AccountModalContext);
  const subModalContext = useContext(SubModalContext);

  return (
    <GeneralModal
      open={accountModalContext.isOpen}
      onClose={accountModalContext.closeModal}
      size={accountModalContext.modalSize}
    >
      <MessageModal
        open={subModalContext.isOpen}
        onClose={subModalContext.closeModal}
        title={subModalContext.content.title}
        messages={subModalContext.content.messages}
        actions={subModalContext.content.actions}
      />
      {accountModalContext.page === "/addCar" && <AddCarForm />}
      {accountModalContext.page === "/editCar" && <EditCarForm />}
      {accountModalContext.page === "/favourite" && <ConsumerBookingInfo context={accountModalContext} />}
      {accountModalContext.page === "/providerBookingInfo" && (
        <ProviderBookingInfo
          context={accountModalContext}
          content={accountModalContext.content}
        />
      )}
      {accountModalContext.page === "/consumerBookingInfo" && (
        <ConsumerBookingInfo
          context={accountModalContext}
          subModalContext={subModalContext}
        />
      )}
    </GeneralModal>
  );
};

export default AccountModal;
