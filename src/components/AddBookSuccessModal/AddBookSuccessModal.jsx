import { useEffect } from "react";
import Icon from "../Icon/Icon.jsx";
import ThumbsUp from "../../assets/icons/thumbs-up.svg?react";
import css from "./AddBookSuccessModal.module.css";

const AddBookSuccessModal = ({ onClose }) => {
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

        <div className={css.iconWrapper}>
          <div className={css.thumbsUp}>
            <ThumbsUp />
          </div>
        </div>

        <h2 className={css.title}>Good job!</h2>

        <p className={css.message}>
          Your book is now in{" "}
          <span className={css.titleWordSuccessModal}>the library!</span> The
          joy knows no bounds and now you can start your training.
        </p>
      </div>
    </div>
  );
};

export default AddBookSuccessModal;
