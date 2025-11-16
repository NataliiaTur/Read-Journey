import { useState } from "react";
import Dashboard from "@components/Dashboard/Dashboard.jsx";
import RecommendedBooks from "@components/RecommendedBooks/RecommendedBooks.jsx";
import BookModal from "@components/BookModal/BookModal.jsx";
import css from "./RecommendedPage.module.css";

const RecommendedPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className={css.recommendedPage}>
      <Dashboard type="recommended" />
      <RecommendedBooks onBookClick={handleBookClick} />
      {selectedBook && (
        <BookModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RecommendedPage;
