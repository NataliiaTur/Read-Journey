import css from "./BookCard.module.css";
import Icon from "../Icon/Icon";

const BookCard = ({ book, onClick, showDeleteButton = false, onDelete }) => {
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
    <div className={css.bookCard} onClick={handleCardClick}>
      {showDeleteButton && (
        <button
          className={css.deleteButton}
          onClick={handleDeleteClick}
          aria-label="Delete book"
        >
          <Icon name="trash" className={css.trashIcon} />
        </button>
      )}

      <div className={css.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={css.bookImage} />
        ) : (
          <div className={css.placeholderImage}>
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className={css.bookInfo}>
        <h3 className={css.bookTitle}>{title}</h3>
        <p className={css.bookAuthor}>{author}</p>
      </div>
    </div>
  );
};

export default BookCard;
