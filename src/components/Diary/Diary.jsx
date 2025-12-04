import { useState } from "react";
import { useDeleteReadingMutation } from "@redux/books/booksApi.js";
import { showOperationSuccess, handleApiError } from "@utils/notifications.jsx";
import Icon from "@components/Icon/Icon.jsx";
import css from "./Diary.module.css";

const Diary = ({ book }) => {
  const [viewMode, setViewMode] = useState("diary"); // 'diary' or 'statistics'
  const [deleteReading] = useDeleteReadingMutation();

  const handleDeleteReading = async (readingId) => {
    try {
      await deleteReading({
        bookId: book._id,
        readingId,
      }).unwrap();
      showOperationSuccess("readingDeleted");
    } catch (error) {
      handleApiError(error);
    }
  };

  // Отримуємо історію читання
  const readingHistory = book.progress || [];

  // Функція для форматування дати
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Функція для підрахунку відсотків
  const calculatePercentage = (pagesRead) => {
    return ((pagesRead / book.totalPages) * 100).toFixed(1);
  };

  // Функція для підрахунку швидкості читання
  const calculateSpeed = (pagesRead, timeMinutes) => {
    if (!timeMinutes) return 0;
    return Math.round((pagesRead / timeMinutes) * 60);
  };

  return (
    <div className={css.diary}>
      {/* Header with view mode switcher */}
      <div className={css.header}>
        <h3 className={css.title}>
          {viewMode === "diary" ? "Diary" : "Statistics"}
        </h3>

        <div className={css.viewSwitcher}>
          <button
            className={`${css.viewButton} ${
              viewMode === "diary" ? css.active : ""
            }`}
            onClick={() => setViewMode("diary")}
            aria-label="Diary view"
          >
            <Icon name="hourglass" className={css.viewIcon} />
          </button>
          <button
            className={`${css.viewButton} ${
              viewMode === "statistics" ? css.active : ""
            }`}
            onClick={() => setViewMode("statistics")}
            aria-label="Statistics view"
          >
            <Icon name="pie-chart" className={css.viewIcon} />
          </button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "diary" ? (
        <div className={css.diaryContent}>
          {readingHistory.length === 0 ? (
            <p className={css.emptyText}>No reading history yet</p>
          ) : (
            <div className={css.historyList}>
              {readingHistory.map((entry) => (
                <div key={entry._id} className={css.historyItem}>
                  <div className={css.historyHeader}>
                    <span className={css.date}>
                      {formatDate(entry.startDate)}
                    </span>
                    <span className={css.pagesRead}>
                      {entry.pagesRead} pages
                    </span>
                  </div>

                  <div className={css.historyDetails}>
                    <div className={css.stats}>
                      <div className={css.statItem}>
                        <span className={css.percentage}>
                          {calculatePercentage(entry.pagesRead)}%
                        </span>
                        <span className={css.time}>
                          {entry.timeSpent || 0} minutes
                        </span>
                      </div>

                      <div className={css.speedChart}>
                        <div
                          className={css.speedBar}
                          style={{
                            height: `${Math.min(
                              calculatePercentage(entry.pagesRead),
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <span className={css.speed}>
                        {calculateSpeed(entry.pagesRead, entry.timeSpent)} pages
                        per hour
                      </span>
                    </div>

                    <button
                      className={css.deleteButton}
                      onClick={() => handleDeleteReading(entry._id)}
                      aria-label="Delete reading entry"
                    >
                      <Icon name="trash" className={css.trashIcon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={css.statisticsContent}>
          <p className={css.statisticsText}>
            Each page, each chapter is a new round of knowledge, a new step
            towards understanding. By rewriting statistics, we create our own
            reading history.
          </p>
          {/* TODO: Додати графік статистики */}
          <div className={css.statisticsPlaceholder}>
            Statistics chart will be here
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
