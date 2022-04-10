import classes from "./CarSpaceModal.module.css";

import { useContext } from "react";

import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceInfo from "./CarSpaceInfo/CarSpaceInfo";
import CarSpaceRegistrationForm from "./CarSpaceRegistrationForm/CarSpaceRegistrationForm";
import CarSpaceEditForm from "./CarSpaceEditForm/CarSpaceEditForm";
import CarSpaceModalContext from "../../../contexts/carspace-modal-context";
import CarSpaceReviews from "./CarSpaceReviews/CarSpaceReviews";
import CarSpaceBookings from "./CarSpaceBookings/CarSpaceBookings";

const CarSpaceModal = () => {
  const carSpaceModalContext = useContext(CarSpaceModalContext);

  return (
    <GeneralModal
      open={carSpaceModalContext.isOpen}
      onClose={carSpaceModalContext.closeModal}
      className={classes.modal}
    >
      {carSpaceModalContext.page === "/add" && <CarSpaceRegistrationForm />}
      {carSpaceModalContext.page === "/edit" && <CarSpaceEditForm />}
      {carSpaceModalContext.page === "/info" && <CarSpaceInfo />}
      {carSpaceModalContext.page === "/reviews" && <CarSpaceReviews />}
      {carSpaceModalContext.page === "/bookings" && <CarSpaceBookings />}
    </GeneralModal>
  );
};

export default CarSpaceModal;
