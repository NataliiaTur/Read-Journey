import { useEffect } from "react";
import { useAddBookToLibraryMutation } from "@redux/books/booksApi.js";
import {
  showOperationSuccess,
  showErrorNotification,
} from "@utils/notifications.jsx";
import { Button } from "../Button/Button.jsx";
import Icon from "../Icon/Icon.jsx";
import css from "./BookModal.module.css";

const BookModal = ({ book, onClose }) => {
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
      showOperationSuccess("bookAdded");
      onClose();
    } catch (error) {
      showErrorNotification(
        error?.data?.message || "Failed to add book to library"
      );
    }
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
            <div className={css.placeholderImage}>No Image</div>
          )}
        </div>

        <h2 className={css.title}>{book.title}</h2>
        <p className={css.author}>{book.author}</p>
        <p className={css.pages}>{book.totalPages} pages</p>

        <Button
          onClick={handleAddToLibrary}
          disabled={isLoading}
          className={css.addButton}
        >
          {isLoading ? "Adding..." : "Add to library"}
        </Button>
      </div>
    </div>
  );
};

export default BookModal;
