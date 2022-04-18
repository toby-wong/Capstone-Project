import classes from "./Consumer.module.css";

import { Route, Routes } from "react-router-dom";

import { ConsumerModalContextProvider } from "../../contexts/consumer-modal-context";
import { SubModalContextProvider } from "../../contexts/submodal-context";

import ConsumerView from "./ConsumerView/ConsumerView";
import ConsumerModal from "./ConsumerModal/ConsumerModal";

const Consumer = () => {
  return (
    <ConsumerModalContextProvider>
      <div className={classes.body}>
        <SubModalContextProvider>
          <ConsumerModal />
        </SubModalContextProvider>
        <Routes>
          <Route path="/" element={<ConsumerView />} />
          <Route
            path="/anonSearch"
            element={<ConsumerView anonymous={true} />}
          />
        </Routes>
      </div>
    </ConsumerModalContextProvider>
  );
};

export default Consumer;
