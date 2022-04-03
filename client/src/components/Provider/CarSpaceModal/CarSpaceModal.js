import GeneralModal from "../../UI/GeneralModal/GeneralModal";
import CarSpaceInfo from "./CarSpaceInfo/CarSpaceInfo";

import classes from "./CarSpaceModal.module.css";
import CarSpaceRegistrationForm from "./CarSpaceRegistrationForm/CarSpaceRegistrationForm";

const CarSpaceModal = ({ open, onClose, className }) => {
  return (
    <GeneralModal open={open} onClose={onClose} className={classes.modal}>
      {/* <CarSpaceInfo
          carInfo={{
            streetAddress: "507 Wattle Street",
            city: "Ultimo",
            state: "NSW",
            postcode: "2007",
            maxVehicleSize: "4WD/SUV",
            notes:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet massa rhoncus, fringilla lectus eu, semper nisl. Quisque egestas, quam a dignissim aliquam, ipsum nunc faucibus nisi, in tempor nisi velit non purus. Fusce vel enim eu lacus consectetur vestibulum ac vitae felis. Nulla facilisi. Nam eu nisl vitae felis tincidunt pellentesque. In magna tortor, dictum ut bibendum in, mollis a ex. Nullam finibus venenatis lacus dictum elementum. Morbi blandit mauris non maximus faucibus. Quisque tincidunt bibendum elit a bibendum. Nam congue quam a sapien hendrerit, mattis facilisis purus mattis. Suspendisse lorem ante, molestie eget erat nec, lobortis viverra., lobortis viverra., lobortis viverra., lobortis viverra., lobortis viverra., lobortis viverra.",
          }}
          onClose={onClose}
        /> */}
      <CarSpaceRegistrationForm onClose={onClose} />
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
