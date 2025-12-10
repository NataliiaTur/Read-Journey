import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddBookToLibraryMutation,
  useGetUserBooksQuery,
} from "../../redux/books/booksApi";
import { showOperationError, handleApiError } from "../../utils/notifications";
import { Button } from "../Button/Button";
import Icon from "../Icon/Icon";
import css from "./BookModal.module.css";

const BookModal = ({ book, onClose, onSuccess, mode = "recommended" }) => {
  const navigate = useNavigate();
  const [addBookToLibrary, { isLoading }] = useAddBookToLibraryMutation();

  // Отримуємо список книг користувача (тільки для авторизованих)
  const { data: userBooksData } = useGetUserBooksQuery(undefined, {
    skip: mode === "public", // ✅ Пропускаємо запит для публічного режиму
  });

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
    // ✅ Якщо публічний режим - викликаємо callback (показ повідомлення + редірект)
    if (mode === "public") {
      if (onSuccess) {
        onSuccess();
      }
      return;
    }

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

  // ✅ Визначаємо текст та дію кнопки
  const renderButton = () => {
    if (mode === "public") {
      return (
        <Button onClick={handleAddToLibrary} className={css.actionButton}>
          Login to add
        </Button>
      );
    }

    if (mode === "recommended") {
      return (
        <Button
          onClick={handleAddToLibrary}
          disabled={isLoading}
          className={css.actionButton}
        >
          {isLoading ? "Adding..." : "Add to library"}
        </Button>
      );
    }

    // mode === "library"
    return (
      <Button onClick={handleStartReading} className={css.actionButton}>
        Start reading
      </Button>
    );
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

        {renderButton()}
      </div>
    </div>
  );
};

export default BookModal;
