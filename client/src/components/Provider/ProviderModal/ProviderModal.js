import { useContext } from "react";
import { useLocation } from "react-router-dom";

import ProviderModalContext from "../../../contexts/provider-modal-context";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceRegistrationForm from "./CarSpaceRegistrationForm/CarSpaceRegistrationForm";
import CarSpaceEditForm from "./CarSpaceEditForm/CarSpaceEditForm";
import ProviderCarSpaceInfo from "./ProviderCarSpaceInfo/ProviderCarSpaceInfo";
import CarSpaceReviews from "../../CarSpaceReviews/CarSpaceReviews";
import CarSpaceBookings from "./CarSpaceBookings/CarSpaceBookings";
import ProviderBookingInfo from "../../BookingInfo/ProviderBookingInfo/ProviderBookingInfo";

const ProviderModal = () => {
  const providerModalContext = useContext(ProviderModalContext);
  const location = useLocation();
  const listStatus = location.pathname.split("/").at(-1);

  return (
    <GeneralModal
      open={providerModalContext.isOpen}
      onClose={providerModalContext.closeModal}
      size="large"
    >
      {providerModalContext.page === "/add" && <CarSpaceRegistrationForm />}
      {providerModalContext.page === "/edit" && <CarSpaceEditForm />}
      {providerModalContext.page === "/info" && (
        <ProviderCarSpaceInfo status={listStatus} />
      )}
      {providerModalContext.page === "/reviews" && (
        <CarSpaceReviews modalContext={providerModalContext} />
      )}
      {providerModalContext.page === "/bookings" && <CarSpaceBookings />}
      {providerModalContext.page === "/booking" && (
        <ProviderBookingInfo
          context={providerModalContext}
          content={providerModalContext.bookingInfo}
          onBack={() => {
            providerModalContext.openPage("/bookings");
          }}
        />
      )}
    </GeneralModal>
  );
};

export default ProviderModal;
