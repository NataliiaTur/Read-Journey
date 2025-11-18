import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addBookSchema } from "@schemas/validationSchemas.js";
import {
  useAddNewBookMutation,
  useGetRecommendedBooksQuery,
} from "../../redux/books/booksApi";
import { showErrorNotification } from "@utils/notifications.jsx";
import { Button } from "../Button/Button.jsx";
import Icon from "../Icon/Icon";
import BookCard from "../BookCard/BookCard";
import { useEffect } from "react";
import css from "./LibraryDashboard.module.css";

const LibraryDashboard = ({
  onRecommendedBookClick,
  selectedRecommendedBook,
  onBookAdded,
}) => {
  const [addNewBook, { isLoading }] = useAddNewBookMutation();

  // Отримуємо 3 рекомендовані книги
  const { data: recommendedData } = useGetRecommendedBooksQuery({
    page: 1,
    limit: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(addBookSchema),
    defaultValues: {
      title: "",
      author: "",
      totalPages: "",
    },
  });

  // Автозаповнення форми при виборі рекомендованої книги
  useEffect(() => {
    if (selectedRecommendedBook) {
      setValue("title", selectedRecommendedBook.title);
      setValue("author", selectedRecommendedBook.author);
      setValue("totalPages", selectedRecommendedBook.totalPages);
    }
  }, [selectedRecommendedBook, setValue]);

  const onSubmit = async (data) => {
    try {
      await addNewBook(data).unwrap();
      reset();
      if (onBookAdded) {
        onBookAdded();
      }
    } catch (error) {
      showErrorNotification(error?.data?.message || "Failed to add book");
    }
  };

  const recommendedBooks = recommendedData?.results?.slice(0, 3) || [];

  return (
    <div className={css.libraryDashboard}>
      {/* Add Book Form */}
      <div className={css.addBookBlock}>
        <h2 className={css.title}>Filters:</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputWrapper}>
            <label className={css.label}>Book title:</label>
            <input
              type="text"
              placeholder="Enter text"
              className={css.input}
              {...register("title")}
            />
            {errors.title && (
              <span className={css.error}>{errors.title.message}</span>
            )}
          </div>

          <div className={css.inputWrapper}>
            <label className={css.label}>The author:</label>
            <input
              type="text"
              placeholder="Enter text"
              className={css.input}
              {...register("author")}
            />
            {errors.author && (
              <span className={css.error}>{errors.author.message}</span>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className={css.addButton}>
            {isLoading ? "Adding..." : "Add book"}
          </Button>
        </form>

        {/* Recommended Books */}
        <div className={css.recommendedBlock}>
          <h3 className={css.recommendedTitle}>Recommended books</h3>

          <div className={css.recommendedList}>
            {recommendedBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onClick={() => onRecommendedBookClick(book)}
                className={css.libraryImgBook}
              />
            ))}
          </div>

          <a href="/recommended" className={css.homeLink}>
            <span>Home</span>
            <Icon name="chevron-right" className={css.arrowIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
