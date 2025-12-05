import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "@redux/books/booksApi.js";
import ReadingDashboard from "@components/ReadingDashboard/ReadingDashboard.jsx";
import MyBook from "@components/MyBook/MyBook.jsx";
import css from "./ReadingPage.module.css";

const ReadingPage = () => {
  const { id } = useParams();
  const [isReading, setIsReading] = useState(false);
  const formSubmitRef = useRef(null);

  const { data: book, isLoading, error } = useGetBookByIdQuery(id);

  if (isLoading) {
    return (
      <div className={css.readingPage}>
        <div className={css.loading}>Loading book...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className={css.readingPage}>
        <div className={css.error}>Book not found</div>
      </div>
    );
  }

  const handleReadingStateChange = (reading) => {
    setIsReading(reading);
  };

  // Функція для виклику з кнопки play в MyBook
  const handlePlayClick = () => {
    // Викликаємо submit форми в ReadingDashboard
    if (formSubmitRef.current) {
      formSubmitRef.current();
    }
  };

  return (
    <div className={css.readingPage}>
      <ReadingDashboard
        book={book}
        onReadingStateChange={handleReadingStateChange}
        formSubmitRef={formSubmitRef}
      />
      <MyBook book={book} isReading={isReading} onPlayClick={handlePlayClick} />
    </div>
  );
};

export default ReadingPage;
