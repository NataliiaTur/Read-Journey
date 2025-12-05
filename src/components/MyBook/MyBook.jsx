import Icon from "@components/Icon/Icon.jsx";
import withoutPoster from "@assets/images/withoutPoster1xDesc.webp";
import css from "./MyBook.module.css";

const MyBook = ({ book, isReading, onPlayClick }) => {
  const { imageUrl, title, author } = book;

  return (
    <div className={css.myBook}>
      <h2 className={css.title}>My reading</h2>

      <div className={css.bookContent}>
        <div className={css.imageWrapper}>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className={css.bookImage} />
          ) : (
            <img
              src={withoutPoster}
              alt="No poster available"
              className={css.bookImage}
            />
          )}
        </div>

        <h3 className={css.bookTitle}>{title}</h3>
        <p className={css.bookAuthor}>{author}</p>

        <button
          className={css.playButton}
          onClick={onPlayClick}
          aria-label={isReading ? "Stop reading" : "Start reading"}
          type="button"
        >
          <div className={css.playButtonOuter}>
            {isReading ? (
              <div className={css.stopIcon} />
            ) : (
              <div className={css.playIconInner} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyBook;
