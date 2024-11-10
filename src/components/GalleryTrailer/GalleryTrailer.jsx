import css from "./GalleryTrailer.module.css";

const GalleryTrailer = ({ images }) => {
  return (
    <div className={css.containerImages}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.thumb}
          alt={`Camper Image ${index + 1}`}
          className={css.image}
        />
      ))}
    </div>
  );
};

export default GalleryTrailer;
