import { useContext } from "react";

import ConsumerModalContext from "../../../contexts/consumer-modal-context";
import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceBookingForm from "./CarSpaceBookingForm/CarSpaceBookingForm";

const ConsumerModal = () => {
  const consumerModalContext = useContext(ConsumerModalContext);

  return (
    <GeneralModal
      open={consumerModalContext.isOpen}
      onClose={consumerModalContext.closeModal}
    >
      {consumerModalContext.page === "/book" && <CarSpaceBookingForm />}
    </GeneralModal>
  );
};

export default ConsumerModal;
