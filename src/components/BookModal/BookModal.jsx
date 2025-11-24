import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBookToLibraryMutation } from "@redux/books/booksApi.js";
import { showErrorNotification } from "@utils/notifications.jsx";
import { Button } from "../Button/Button.jsx";
import Icon from "../Icon/Icon.jsx";
import withoutPoster from "@assets/images/withoutPoster1xDesc.webp";
import css from "./BookModal.module.css";

const BookModal = ({ book, onClose, onSuccess, mode = "recommended" }) => {
  const navigate = useNavigate();
  const [addBookToLibrary, { isLoading }] = useAddBookToLibraryMutation();

  // Закриття по ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Закриття по backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToLibrary = async () => {
    try {
      await addBookToLibrary(book._id).unwrap();
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      showErrorNotification(
        error?.data?.message || "Failed to add book to library"
      );
    }
  };

  const handleStartReading = () => {
    onClose();
    navigate(`/reading/${book._id}`);
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="x" className={css.closeIcon} />
        </button>

        <div className={css.imageWrapper}>
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className={css.bookImage}
            />
          ) : (
            <img
              src={withoutPoster}
              alt="No poster available"
              className={css.bookImage}
            />
          )}
        </div>

        <h2 className={css.title}>{book.title}</h2>
        <p className={css.author}>{book.author}</p>
        <p className={css.pages}>{book.totalPages} pages</p>

        {/* ✅ Показуємо різні кнопки залежно від mode */}
        {mode === "recommended" ? (
          <Button
            onClick={handleAddToLibrary}
            disabled={isLoading}
            className={css.actionButton}
          >
            {isLoading ? "Adding..." : "Add to library"}
          </Button>
        ) : (
          <Button onClick={handleStartReading} className={css.actionButton}>
            Start reading
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookModal;
