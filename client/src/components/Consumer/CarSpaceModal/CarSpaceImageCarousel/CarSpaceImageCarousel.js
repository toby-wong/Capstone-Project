import classes from "./CarSpaceImageCarousel.module.css";

import Carousel from "react-material-ui-carousel";

const CarSpaceImageCarousel = ({ children }) => {
  return (
    <Carousel
      className={classes["image-container"]}
      autoPlay={false}
      animation="slide"
      indicators={false}
    >
      {children}
    </Carousel>
  );
};

export default CarSpaceImageCarousel;
