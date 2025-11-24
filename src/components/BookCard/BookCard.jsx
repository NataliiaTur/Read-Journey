import css from "./BookCard.module.css";
import Icon from "../Icon/Icon.jsx";

const BookCard = ({
  book,
  onClick,
  showDeleteButton = false,
  onDelete,
  className,
}) => {
  const { imageUrl, title, author } = book;

  const handleCardClick = () => {
    if (onClick) {
      onClick(book);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Запобігаємо спрацюванню onClick картки
    if (onDelete) {
      onDelete(book._id);
    }
  };

  return (
    <div
      className={`${css.bookCard} ${className || ""}`}
      onClick={handleCardClick}
    >
      <div className={css.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={css.bookImage} />
        ) : (
          <div className={css.placeholderImage}>
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className={css.bookInfoWrapper}>
        <div
          className={`${css.bookInfo} ${
            showDeleteButton ? css.bookInfoWithDelete : ""
          }`}
        >
          <h3 className={css.bookTitle}>{title}</h3>
          <p className={css.bookAuthor}>{author}</p>
        </div>

        {showDeleteButton && (
          <button
            className={css.deleteButton}
            onClick={handleDeleteClick}
            aria-label="Delete book"
          >
            <Icon
              name="trash"
              className={css.trashIcon}
              size={16}
              style={{ stroke: "#e85050", fill: "none" }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
