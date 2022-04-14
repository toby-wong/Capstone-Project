import { useContext } from "react";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceInfo from "./CarSpaceInfo/CarSpaceInfo";
import CarSpaceRegistrationForm from "./CarSpaceRegistrationForm/CarSpaceRegistrationForm";
import CarSpaceEditForm from "./CarSpaceEditForm/CarSpaceEditForm";
import CarSpaceModalContext from "../../../contexts/carspace-modal-context";
import CarSpaceReviews from "./CarSpaceReviews/CarSpaceReviews";
import CarSpaceBookings from "./CarSpaceBookings/CarSpaceBookings";
import { useLocation } from "react-router-dom";

const CarSpaceModal = () => {
  const carSpaceModalContext = useContext(CarSpaceModalContext);
  const location = useLocation();
  const listStatus = location.pathname.split("/").at(-1);

  return (
    <GeneralModal
      open={carSpaceModalContext.isOpen}
      onClose={carSpaceModalContext.closeModal}
      size="large"
    >
      {carSpaceModalContext.page === "/add" && <CarSpaceRegistrationForm />}
      {carSpaceModalContext.page === "/edit" && <CarSpaceEditForm />}
      {carSpaceModalContext.page === "/info" && (
        <CarSpaceInfo status={listStatus} />
      )}
      {carSpaceModalContext.page === "/reviews" && <CarSpaceReviews />}
      {carSpaceModalContext.page === "/bookings" && <CarSpaceBookings />}
    </GeneralModal>
  );
};

export default CarSpaceModal;
