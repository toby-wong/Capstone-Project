import classes from "./Consumer.module.css";

import { ConsumerModalContextProvider } from "../../contexts/consumer-modal-context";

import ConsumerView from "./ConsumerView/ConsumerView";
import ConsumerModal from "./ConsumerModal/ConsumerModal";

const Consumer = () => {
  return (
    <ConsumerModalContextProvider>
      <div className={classes.body}>
        <ConsumerModal />
        <ConsumerView />
      </div>
    </ConsumerModalContextProvider>
  );
};

export default Consumer;
