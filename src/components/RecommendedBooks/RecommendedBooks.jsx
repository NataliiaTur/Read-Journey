import css from "./RecommendedBooks.module.css";
import { useSelector } from "react-redux";
import { selectFilters } from "@redux/books/booksSlice.js";
import { useDebounce } from "@hooks/useDebounce";
import { useGetRecommendedBooksQuery } from "@redux/books/booksApi.js";
import BookCard from "../BookCard/BookCard.jsx";
import Icon from "../Icon/Icon.jsx";

const RecommendedBooks = ({ onBookClick, currentPage, onPageChange }) => {
  const filters = useSelector(selectFilters);
  const limit = 10;

  console.log("=== RECOMMENDED BOOKS RENDER ===");
  console.log("Current filters:", filters);
  console.log("Current page:", currentPage);

  // ✅ Додаємо debounce для фільтрів
  const debouncedTitle = useDebounce(filters.title, 500);
  const debouncedAuthor = useDebounce(filters.author, 500);

  console.log("Debounced title:", debouncedTitle);
  console.log("Debounced author:", debouncedAuthor);

  const { data, isLoading, error, isFetching } = useGetRecommendedBooksQuery({
    page: currentPage,
    limit,
    title: debouncedTitle,
    author: debouncedAuthor,
  });

  console.log("Query result:", { data, isLoading, error, isFetching });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data && currentPage < data.totalPages) {
      onPageChange(currentPage + 1);
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
        <div className={css.errorState}>
          <div className={css.errorIcon}>⚠️</div>
          <p className={css.errorTitle}>Failed to load books</p>
          <p className={css.errorMessage}>
            {error?.data?.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={css.retryButton}
          >
            Retry
          </button>
        </div>
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
            disabled={currentPage === 1 || isFetching}
            className={css.paginationButton}
            aria-label="Previous page"
          >
            <Icon name="chevron-left" className={css.arrowIcon} />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isFetching}
            className={css.paginationButton}
            aria-label="Next page"
          >
            <Icon name="chevron-right" className={css.arrowIcon} />
          </button>
        </div>
      </div>

      {/* ✅ Показуємо overlay під час fetching */}
      {isFetching && (
        <div className={css.fetchingOverlay}>
          <div className={css.spinner}></div>
        </div>
      )}

      {books.length === 0 ? (
        <div className={css.emptyState}>
          <div className={css.emptyIcon}>📚</div>
          <p className={css.emptyText}>No books found</p>
          <p className={css.emptyHint}>
            Try adjusting your filters or browse all books
          </p>
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
