import CarSpaceImageCarousel from "../../CarSpaceImageCarousel/CarSpaceImageCarousel";
import CarSpaceFormImageItem from "../CarSpaceFormImageItem/CarSpaceFormImageItem";

const CarSpaceFormImageCarousel = ({ images, onDeleteImage = () => {} }) => {
  return (
    <CarSpaceImageCarousel>
      {images.map((imgSrc, idx) => (
        <CarSpaceFormImageItem
          id={idx}
          imgSrc={imgSrc}
          onDelete={onDeleteImage}
        />
      ))}
    </CarSpaceImageCarousel>
  );
};

export default CarSpaceFormImageCarousel;
