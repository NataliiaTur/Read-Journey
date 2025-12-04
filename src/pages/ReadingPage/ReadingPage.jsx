import { useParams } from "react-router-dom";
import React, { useState } from "react";
import css from "./ReadingPage.module.css";
import { useGetBookByIdQuery } from "@redux/books/booksApi.js";
import ReadingDashboard from "@components/ReadingDashboard/ReadingDashboard.jsx";
import MyBook from "@components/MyBook/MyBook.jsx";

const ReadingPage = () => {
  const { id } = useParams();
  const [isReading, setIsReading] = useState(false);

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

  return (
    <div className={css.readingPage}>
      <ReadingDashboard
        book={book}
        onReadingStateChange={handleReadingStateChange}
      />

      <MyBook book={book} isReading={isReading} />
    </div>
  );
};
export default ReadingPage;
