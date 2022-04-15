import classes from "./Consumer.module.css";

import { Route, Routes } from "react-router-dom";

import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import ConsumerView from "./ConsumerView/ConsumerView";
import { CarSpaceModalContextProvider } from "../../contexts/carspace-modal-context";

/*
  Set a modal size: large, medium, small
*/
const Consumer = () => {
  return (
    <CarSpaceModalContextProvider>
      <div className={classes.body}>
        <CarSpaceModal />
          <ConsumerView />
      </div>
    </CarSpaceModalContextProvider>
  );
};

export default Consumer;
