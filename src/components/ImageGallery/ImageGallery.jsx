import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.imageCard}>
          <ImageCard
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            onClick={() => openModal(image)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
