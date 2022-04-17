import classes from "./Consumer.module.css";

import { ConsumerModalContextProvider } from "../../contexts/consumer-modal-context";

import ConsumerView from "./ConsumerView/ConsumerView";
import ConsumerModal from "./ConsumerModal/ConsumerModal";
import { SubModalContextProvider } from "../../contexts/submodal-context";

const Consumer = () => {
  return (
    <ConsumerModalContextProvider>
      <div className={classes.body}>
        <SubModalContextProvider>
          <ConsumerModal />
        </SubModalContextProvider>
        <ConsumerView />
      </div>
    </ConsumerModalContextProvider>
  );
};

export default Consumer;
