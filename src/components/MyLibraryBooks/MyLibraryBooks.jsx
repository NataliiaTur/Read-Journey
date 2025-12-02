import { useState } from "react";
import {
  useGetUserBooksQuery,
  useRemoveBookMutation,
} from "@redux/books/booksApi.js";
import {
  showOperationSuccess,
  showErrorNotification,
} from "@utils/notifications.jsx";
import BookCard from "../BookCard/BookCard";
import Icon from "../Icon/Icon";
import css from "./MyLibraryBooks.module.css";

const MyLibraryBooks = ({ onBookClick }) => {
  const [filter, setFilter] = useState("All books");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, isLoading, error } = useGetUserBooksQuery(
    filter === "All books" ? undefined : filter
  );

  const [removeBook] = useRemoveBookMutation();

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook(bookId).unwrap();
      showOperationSuccess("bookRemoved");
    } catch (error) {
      showErrorNotification(error?.data?.message || "Failed to remove book");
    }
  };

  if (isLoading) {
    return (
      <div className={css.myLibraryBooks}>
        <div className={css.loading}>Loading your library...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.myLibraryBooks}>
        <div className={css.error}>Failed to load your library</div>
      </div>
    );
  }

  const books = Array.isArray(data) ? data : data?.results || [];

  return (
    <div className={css.myLibraryBooks}>
      {/* Header with filter */}
      <div className={css.header}>
        <h2 className={css.title}>My library</h2>

        {/* Custom Select Dropdown */}
        <div className={css.filterWrapper}>
          <button
            className={css.filterButton}
            onClick={toggleDropdown}
            type="button"
          >
            <span>{filter}</span>
            <Icon
              name="chevron-down"
              className={`${css.chevronIcon} ${
                isDropdownOpen ? css.chevronOpen : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className={css.dropdown}>
              <button
                className={`${css.dropdownItem} ${
                  filter === "All books" ? css.active : ""
                }`}
                onClick={() => handleFilterChange("All books")}
                type="button"
              >
                All books
              </button>
              <button
                className={`${css.dropdownItem} ${
                  filter === "Unread" ? css.active : ""
                }`}
                onClick={() => handleFilterChange("Unread")}
                type="button"
              >
                Unread
              </button>
              <button
                className={`${css.dropdownItem} ${
                  filter === "In progress" ? css.active : ""
                }`}
                onClick={() => handleFilterChange("In progress")}
                type="button"
              >
                In progress
              </button>
              <button
                className={`${css.dropdownItem} ${
                  filter === "Done" ? css.active : ""
                }`}
                onClick={() => handleFilterChange("Done")}
                type="button"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Books or Empty State */}
      {books.length === 0 ? (
        <div className={css.emptyState}>
          <Icon name="book" className={css.emptyIcon} />
          <p className={css.emptyText}>
            To start training, add some of your books or from the recommended
            ones
          </p>
        </div>
      ) : (
        <div className={css.booksList}>
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => onBookClick(book)}
              showDeleteButton={true}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibraryBooks;
