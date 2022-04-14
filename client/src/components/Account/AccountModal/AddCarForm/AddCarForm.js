import classes from "./AddCarForm.module.css";

import { useContext } from "react";
import AccountModalContext from "../../../../contexts/account-modal-context";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import GeneralModalHeader from "../../../UI/GeneralModal/GeneralModalHeader";
import GeneralModalContent from "../../../UI/GeneralModal/GeneralModalContent";
import InputField from "../../../UI/InputField/InputField";
import InputContainer from "../../../UI/InputContainer/InputContainer";
import { Icon } from "@mui/material";

const AddCarForm = () => {
  const accountModalContext = useContext(AccountModalContext);

  return (
    <form style={{ flex: 1 }}>
      <GeneralModalHeader
        title="Add Car"
        onClose={accountModalContext.closeModal}
      />
      <GeneralModalContent>
        <div className={`${classes.inputs} ${classes.horizontal}`}>
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
        </div>
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
      </GeneralModalContent>
    </form>
  );
};

export default AddCarForm;
