import { useState } from "react";
import css from "./RecommendedBooks.module.css";
import { useSelector } from "react-redux";
import { selectFilters } from "@redux/books/booksSlice.js";
import { useGetRecommendedBooksQuery } from "@redux/books/booksApi.js";
import BookCard from "../BookCard/BookCard.jsx";
import Icon from "../Icon/Icon.jsx";

const RecommendedBooks = ({ onBookClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const filters = useSelector(selectFilters);
  const limit = 10;

  const { data, isLoading, error } = useGetRecommendedBooksQuery({
    page: currentPage,
    limit,
    title: filters.title,
    author: filters.author,
  });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className={css.recommendedBooks}>
        <div className={css.loading}>Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.recommendedBooks}>
        <div className={css.error}>Failed to load books. Please try again.</div>
      </div>
    );
  }

  const books = data?.results || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.recommendedBooks}>
      <div className={css.header}>
        <h2 className={css.title}>Recommended</h2>
        <div className={css.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={css.paginationButton}
            aria-label="Previous page"
          >
            <Icon name="chevron-left" className={css.arrowIcon} />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={css.paginationButton}
            aria-label="Next page"
          >
            <Icon name="chevron-right" className={css.arrowIcon} />
          </button>
        </div>
      </div>

      {books.length === 0 ? (
        <div className={css.emptyState}>
          <p>No books found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className={css.booksList}>
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => onBookClick(book)}
            />
          ))}
        </div>
      )}

      {/* <div className={css.pageInfo}>
        Page {currentPage} of {totalPages}
      </div> */}
    </div>
  );
};

export default RecommendedBooks;
