import { useState } from "react";
import CarSpaceModal from "./CarSpaceModal/CarSpaceModal";
import classes from "./Provider.module.css";

const Provider = () => {
  const [carSpaceModalOpen, setCarSpaceModalOpen] = useState(true);

  const carSpaceModalCloseHandler = () => {
    setCarSpaceModalOpen(false);
  };

  return (
    <div className={classes.body}>
      <CarSpaceModal
        open={carSpaceModalOpen}
        onClose={carSpaceModalCloseHandler}
      />
    </div>
  );
};

export default Provider;
