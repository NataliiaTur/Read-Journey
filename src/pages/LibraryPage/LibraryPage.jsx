import { useState } from "react";
import css from "./LibraryPage.module.css";
import LibraryDashboard from "@components/LibraryDashboard/LibraryDashboard.jsx";
import MyLibraryBooks from "@components/MyLibraryBooks/MyLibraryBooks.jsx";
import BookModal from "@components/BookModal/BookModal.jsx";
import AddBookSuccessModal from "@components/AddBookSuccessModal/AddBookSuccessModal.jsx";

const LibraryPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRecommendedBook, setSelectedRecommendedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleRecommendedBookClick = (book) => {
    setSelectedRecommendedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleBookAdded = () => {
    setSelectedRecommendedBook(null);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className={css.libraryPage}>
      <LibraryDashboard
        onRecommendedBookClick={handleRecommendedBookClick}
        selectedRecommendedBook={selectedRecommendedBook}
        onBookAdded={handleBookAdded}
      />
      <MyLibraryBooks onBookClick={handleBookClick} />

      {/* Модалка для книги з бібліотеки - кнопка Start reading */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={handleCloseModal}
          mode="library"
        />
      )}
      {/* Модалка успіху додавання книги */}
      {showSuccessModal && (
        <AddBookSuccessModal onClose={handleCloseSuccessModal} />
      )}
    </div>
  );
};

export default LibraryPage;
