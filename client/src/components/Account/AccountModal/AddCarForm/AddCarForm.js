import classes from "./AddCarForm.module.css";

import { useContext } from "react";
import AccountModalContext from "../../../../contexts/account-modal-context";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import NumbersIcon from "@mui/icons-material/Numbers";

import GeneralModalHeader from "../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../UI/GeneralModal/GeneralModalContent";
import InputField from "../../../UI/InputField/InputField";
import InputContainer from "../../../UI/InputContainer/InputContainer";
import { Button, Icon } from "@mui/material";
import GeneralModalActions from "../../../UI/GeneralModal/GeneralModalActions";

const AddCarForm = () => {
  const accountModalContext = useContext(AccountModalContext);

  return (
    <form className={classes.form}>
      <GeneralModalHeader
        title="Add Car"
        onClose={accountModalContext.closeModal}
      />
      <GeneralModalContent>
        <div className={classes.inputs}>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={WarehouseIcon} />
            <InputField
              //  className={`${classes.input} ${classes.field}`}
              inputClassName={classes.input}
              label="Manufacturer"
              type="text"
              name="manufacturer"
              //  value={formState.streetNumber.value}
              //  onChange={streetNumberChangeHandler}
            />
          </InputContainer>
          <InputContainer>
            <Icon
              variant="form"
              fontSize="large"
              component={DirectionsCarIcon}
            />
            <InputField
              //  className={`${classes.input} ${classes.field}`}
              inputClassName={classes.input}
              label="Model"
              type="text"
              name="model"
              //  value={formState.streetNumber.value}
              //  onChange={streetNumberChangeHandler}
            />
          </InputContainer>
        </div>
        <div className={classes.inputs}>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={AccessTimeIcon} />
            <InputField
              //  className={`${classes.input} ${classes.field}`}
              inputClassName={classes.input}
              label="Year"
              type="number"
              name="year"
              //  value={formState.streetNumber.value}
              //  onChange={streetNumberChangeHandler}
            />
          </InputContainer>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={ColorLensIcon} />
            <InputField
              //  className={`${classes.input} ${classes.field}`}
              inputClassName={classes.input}
              label="Colour"
              type="text"
              name="colour"
              //  value={formState.streetNumber.value}
              //  onChange={streetNumberChangeHandler}
            />
          </InputContainer>
        </div>
        <div className={classes.inputs}>
          <InputContainer>
            <Icon variant="form" fontSize="large" component={NumbersIcon} />
            <InputField
              //  className={`${classes.input} ${classes.field}`}
              inputClassName={classes.input}
              label="Registration Number"
              type="number"
              name="registrationNumber"
              //  value={formState.streetNumber.value}
              //  onChange={streetNumberChangeHandler}
            />
          </InputContainer>
        </div>
      </GeneralModalContent>
      <GeneralModalActions>
        <Button
          variant="contained"
          size="large"
          type="submit"
          //  disabled={!formState.isFormValid}
        >
          Register
        </Button>
      </GeneralModalActions>
    </form>
  );
};

export default AddCarForm;
