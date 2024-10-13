import css from "./ImageCard.module.css";

function ImageCard({ src, alt, onClick }) {
  return (
    <div onClick={onClick} className={css.card} style={{ cursor: "pointer" }}>
      <img src={src} alt={alt} />
    </div>
  );
}

export default ImageCard;
