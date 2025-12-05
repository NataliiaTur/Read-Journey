import { useEffect } from "react";
import { Button } from "@components/Button/Button.jsx";
import Icon from "@components/Icon/Icon.jsx";
import css from "./BookFinishedModal.module.css";

const BookFinishedModal = ({ onClose }) => {
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

        <h2 className={css.title}>The book is read</h2>
        <p className={css.message}>
          It was an{" "}
          <span className={css.wordBookFinishedModal}>exciting journey</span>,
          where each page revealed new horizons, and the characters became
          inseparable friends.
        </p>
      </div>
    </div>
  );
};

export default BookFinishedModal;
