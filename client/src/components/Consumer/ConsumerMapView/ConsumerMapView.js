import { Button } from "@mui/material";
import { useContext } from "react";
import ConsumerModalContext from "../../../contexts/consumer-modal-context";

const ConsumerMapView = () => {
  const consumerModalContext = useContext(ConsumerModalContext);

  const bookingHandler = () => {
    consumerModalContext.openPage("/book");
  };

  return (
    <div>
      <Button variant="contained" size="large" onClick={bookingHandler}>
        Booking
      </Button>
    </div>
  );
};

export default ConsumerMapView;
