import { useState } from "react";
import Dashboard from "@components/Dashboard/Dashboard.jsx";
import RecommendedBooks from "@components/RecommendedBooks/RecommendedBooks.jsx";
import BookModal from "@components/BookModal/BookModal.jsx";
import SuccessModal from "@components/SuccessModal/SuccessModal.jsx";
import css from "./RecommendedPage.module.css";

const RecommendedPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleBookAdded = () => {
    setSelectedBook(null);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // ✅ Callback для скидання пагінації
  const handleFiltersApply = () => {
    setCurrentPage(1);
  };

  return (
    <div className={css.recommendedPage}>
      <Dashboard type="recommended" onFiltersApply={handleFiltersApply} />
      <RecommendedBooks
        onBookClick={handleBookClick}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onSuccess={handleBookAdded}
        />
      )}
      {showSuccessModal && <SuccessModal onClose={handleCloseSuccessModal} />}
    </div>
  );
};

export default RecommendedPage;
