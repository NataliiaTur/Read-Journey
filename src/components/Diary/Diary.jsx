import { useState } from "react";
import { useDeleteReadingMutation } from "@redux/books/booksApi.js";
import { showOperationSuccess, handleApiError } from "@utils/notifications.jsx";
import Icon from "@components/Icon/Icon.jsx";
import css from "./Diary.module.css";

const Diary = ({ book }) => {
  const [viewMode, setViewMode] = useState("diary"); // 'diary' or 'statistics'
  const [deleteReading] = useDeleteReadingMutation();

  const handleDeleteReading = async (readingIndex) => {
    try {
      // API очікує index елемента в масиві progress
      await deleteReading({
        bookId: book._id,
        readingId: readingIndex,
      }).unwrap();
      showOperationSuccess("readingDeleted");
    } catch (error) {
      handleApiError(error);
    }
  };

  // Отримуємо тільки завершену історію читання (status: "inactive")
  const readingHistory =
    book.progress?.filter(
      (entry) => entry.status === "inactive" && entry.finishPage
    ) || [];

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
    if (!book.totalPages || pagesRead <= 0) return "0.0";
    return ((pagesRead / book.totalPages) * 100).toFixed(1);
  };

  // Функція для підрахунку швидкості читання (pages per hour)
  const calculateSpeed = (pagesRead, timeMinutes) => {
    if (!timeMinutes || timeMinutes <= 0) return 0;
    return Math.round((pagesRead / timeMinutes) * 60);
  };

  // Функція для підрахунку часу читання в хвилинах
  const calculateTimeSpent = (startReading, finishReading) => {
    if (!startReading || !finishReading) return 0;
    const start = new Date(startReading);
    const finish = new Date(finishReading);
    const diffMs = finish - start;
    return Math.round(diffMs / 60000); // конвертуємо мілісекунди в хвилини
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
              {readingHistory.map((entry, index) => {
                // ✅ Підраховуємо кількість прочитаних сторінок
                const pagesRead = entry.finishPage - entry.startPage;

                // ✅ Підраховуємо час читання
                const timeSpent = calculateTimeSpent(
                  entry.startReading,
                  entry.finishReading
                );

                // ✅ Використовуємо швидкість з API або розраховуємо
                const speed =
                  entry.speed || calculateSpeed(pagesRead, timeSpent);

                return (
                  <div key={index} className={css.historyItem}>
                    <div className={css.historyHeader}>
                      <span className={css.date}>
                        {formatDate(entry.startReading)}
                      </span>
                      <span className={css.pagesRead}>{pagesRead} pages</span>
                    </div>

                    <div className={css.historyDetails}>
                      <div className={css.stats}>
                        <div className={css.statItem}>
                          <span className={css.percentage}>
                            {calculatePercentage(pagesRead)}%
                          </span>
                          <span className={css.time}>{timeSpent} minutes</span>
                        </div>

                        <div className={css.speedChart}>
                          <div
                            className={css.speedBar}
                            style={{
                              height: `${Math.min(
                                parseFloat(calculatePercentage(pagesRead)),
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <span className={css.speed}>
                          {speed} pages per hour
                        </span>
                      </div>

                      <button
                        className={css.deleteButton}
                        onClick={() => handleDeleteReading(index)}
                        aria-label="Delete reading entry"
                      >
                        <Icon name="trash" className={css.trashIcon} />
                      </button>
                    </div>
                  </div>
                );
              })}
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
