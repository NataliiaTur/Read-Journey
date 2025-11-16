import { useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./SuccessModal.module.css";

const SuccessModal = ({ onClose }) => {
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

        <div className={styles.iconWrapper}>
          <Icon name="check" className={styles.checkIcon} size={48} />
        </div>

        <p className={styles.message}>
          Your book is now in the library! The joy knows no bounds and now you
          can start your reading
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
