import classes from "./CarSpaceBookingForm.module.css";

import { useContext } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import ConsumerModalContext from "../../../../contexts/consumer-modal-context";
import GeneralModalHeader from "../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../UI/GeneralModal/GeneralModalContent";
import InputField from "../../../UI/InputField/InputField";

const CarSpaceBookingForm = () => {
  const consumerModalContext = useContext(ConsumerModalContext);

  return (
    <form className={classes.form}>
      <GeneralModalHeader
        title={"Book Car Space"}
        onClose={consumerModalContext.closeModal}
      />
      <GeneralModalContent direction="row">
        <div className={classes.leftSection}>
          <div className={classes.details__item}>
            <BusinessIcon className={classes.icon} fontSize="large" />
            <InputField
              className={classes.input}
              inputClassName={classes.input}
              label="Address"
              type="text"
              name="address"
              // value={formState.price.value}
              // onChange={priceChangeHandler}
            />
          </div>
        </div>
        <div className={classes.rightSection}>Right</div>
      </GeneralModalContent>
    </form>
  );
};

export default CarSpaceBookingForm;
