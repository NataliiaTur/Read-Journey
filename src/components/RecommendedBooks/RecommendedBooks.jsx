import css from "./RecommendedBooks.module.css";
import { useSelector } from "react-redux";
import { selectFilters } from "@redux/books/booksSlice.js";
import { useDebounce } from "@hooks/useDebounce";
import {
  useGetRecommendedBooksQuery,
  useGetUserBooksQuery,
} from "@redux/books/booksApi.js";
import BookCard from "../BookCard/BookCard.jsx";
import Icon from "../Icon/Icon.jsx";

const RecommendedBooks = ({ onBookClick, currentPage, onPageChange }) => {
  const filters = useSelector(selectFilters);
  const limit = 10;

  const debouncedTitle = useDebounce(filters.title, 500);
  const debouncedAuthor = useDebounce(filters.author, 500);

  const { data, isLoading, error, isFetching } = useGetRecommendedBooksQuery({
    page: currentPage,
    limit,
    title: debouncedTitle,
    author: debouncedAuthor,
  });

  // Отримуємо книги користувача
  const { data: userBooksData } = useGetUserBooksQuery();

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

  // Створюємо Set з ID книг користувача для швидкої перевірки
  const userBooks = Array.isArray(userBooksData)
    ? userBooksData
    : userBooksData?.results || [];

  const userBookKeys = new Set(
    userBooks.map((book) => `${book.title}-${book.author}`)
  );

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
          {books.map((book) => {
            const bookKey = `${book.title}-${book.author}`;
            const isInLibrary = userBookKeys.has(bookKey);

            return (
              <div key={book._id} className={css.bookWrapper}>
                <BookCard
                  book={book}
                  onClick={() => onBookClick(book)}
                  className={isInLibrary ? css.bookInLibrary : ""}
                />
                {isInLibrary && (
                  <div className={css.inLibraryBadge}>
                    <Icon name="check" size={14} />
                    <span>In Library</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommendedBooks;
