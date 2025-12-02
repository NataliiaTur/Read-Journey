import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddBookToLibraryMutation,
  useGetUserBooksQuery,
} from "../../redux/books/booksApi";
import { showOperationError, handleApiError } from "../../utils/notifications";
import { Button } from "../Button/Button";
import Icon from "../Icon/Icon";
import styles from "./BookModal.module.css";

const BookModal = ({ book, onClose, onSuccess, mode = "recommended" }) => {
  const navigate = useNavigate();
  const [addBookToLibrary, { isLoading }] = useAddBookToLibraryMutation();

  //  Отримуємо список книг користувача
  const { data: userBooksData } = useGetUserBooksQuery();

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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToLibrary = async () => {
    // Перевіряємо чи книга вже є в бібліотеці
    const userBooks = Array.isArray(userBooksData)
      ? userBooksData
      : userBooksData?.results || [];

    const bookExists = userBooks.some(
      (userBook) =>
        userBook.title === book.title && userBook.author === book.author
    );

    if (bookExists) {
      showOperationError("bookAlreadyInLibrary");
      return;
    }

    try {
      await addBookToLibrary(book._id).unwrap();
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleStartReading = () => {
    onClose();
    navigate(`/reading/${book._id}`);
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="x" className={styles.closeIcon} />
        </button>

        <div className={styles.imageWrapper}>
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className={styles.bookImage}
            />
          ) : (
            <div className={styles.placeholderImage}>No Image</div>
          )}
        </div>

        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.pages}>{book.totalPages} pages</p>

        {mode === "recommended" ? (
          <Button
            onClick={handleAddToLibrary}
            disabled={isLoading}
            className={styles.actionButton}
          >
            {isLoading ? "Adding..." : "Add to library"}
          </Button>
        ) : (
          <Button onClick={handleStartReading} className={styles.actionButton}>
            Start reading
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookModal;
