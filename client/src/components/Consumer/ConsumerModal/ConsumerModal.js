import { useContext } from "react";

import ConsumerModalContext from "../../../contexts/consumer-modal-context";
import CarSpaceReviews from "../../CarSpaceReviews/CarSpaceReviews";
import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceBookingForm from "./CarSpaceBookingForm/CarSpaceBookingForm";
import ConsumerCarSpaceInfo from "./ConsumerCarSpaceInfo/ConsumerCarSpaceInfo";

const ConsumerModal = () => {
  const consumerModalContext = useContext(ConsumerModalContext);

  return (
    <GeneralModal
      open={consumerModalContext.isOpen}
      onClose={consumerModalContext.closeModal}
    >
      {consumerModalContext.page === "/info" && <ConsumerCarSpaceInfo />}
      {consumerModalContext.page === "/book" && <CarSpaceBookingForm />}
      {consumerModalContext.page === "/reviews" && (
        <CarSpaceReviews modalContext={consumerModalContext} />
      )}
    </GeneralModal>
  );
};

export default ConsumerModal;
