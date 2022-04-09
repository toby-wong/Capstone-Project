import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceInfo from "./CarSpaceInfo/CarSpaceInfo";

import classes from "./CarSpaceModal.module.css";
import CarSpaceRegistrationForm from "./CarSpaceRegistrationForm/CarSpaceRegistrationForm";
import CarSpaceEditForm from "./CarSpaceEditForm/CarSpaceEditForm";
import CarSpaceReviews from "./CarSpaceReviews/CarSpaceReviews";
import { useContext } from "react";
import CarSpaceModalContext from "../../../contexts/carspace-modal-context";

const CarSpaceModal = ({ page, setPage }) => {
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
    </GeneralModal>
  );
};

export default CarSpaceModal;

/*
  <GeneralModal open={open} onClose={onClose} className={classes.modal}>
    <CarSpaceCardHeader title={"Title"} onClose={onClose} />
    <CarSpaceCardContentTop>CardContentTop</CarSpaceCardContentTop>
    <CarSpaceCardContentBottom>CardContentBottom</CarSpaceCardContentBottom>
  </GeneralModal>

  import { Route, Routes } from "react-router-dom";
  <Routes>
  <Route path="login" element={<div>Card</div>} />
  <Route path="signup" element={<SignupForm onClose={onClose} />} />
  </Routes>
*/
