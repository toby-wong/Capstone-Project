import classes from "./Consumer.module.css";

import { ConsumerModalContextProvider } from "../../contexts/consumer-modal-context";
import ConsumerModal from "./ConsumerModal/ConsumerModal";
import ConsumerMapView from "./ConsumerMapView/ConsumerMapView";

const Consumer = () => {
  return (
    <ConsumerModalContextProvider>
      <div className={classes.body}>
        <ConsumerModal />
        <ConsumerMapView />
      </div>
    </ConsumerModalContextProvider>
  );
};

export default Consumer;
