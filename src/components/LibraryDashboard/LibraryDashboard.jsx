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
import { useMemo } from "react";
import css from "./LibraryDashboard.module.css";
import FloatingLabelInput from "../FloatingLabelInput/FloatingLabelInput.jsx";

const LibraryDashboard = ({
  onRecommendedBookClick,
  selectedRecommendedBook,
  onBookAdded,
}) => {
  const [addNewBook, { isLoading }] = useAddNewBookMutation();

  // ✅ Завжди запитуємо 10 книг з 1-ї сторінки
  const { data: recommendedData } = useGetRecommendedBooksQuery({
    page: 1,
    limit: 10,
  });

  // ✅ Вибираємо 3 випадкові книги з отриманих
  const recommendedBooks = useMemo(() => {
    const allBooks = recommendedData?.results || [];

    if (allBooks.length <= 3) {
      return allBooks; // Якщо <= 3, повертаємо всі
    }

    // Вибираємо 3 випадкові книги
    const shuffled = [...allBooks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [recommendedData]);

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

  return (
    <div className={css.libraryDashboard}>
      {/* Add Book Form */}
      <div className={css.addBookBlock}>
        <h2 className={css.title}>Create your library:</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <FloatingLabelInput
            id="title"
            labelName="Book title"
            placeholder="Enter text"
            register={register}
            error={errors.title}
          />

          <FloatingLabelInput
            id="author"
            labelName="The author"
            placeholder="Enter text"
            register={register}
            error={errors.author}
          />

          <FloatingLabelInput
            id="totalPages"
            labelName="Number of pages"
            placeholder="0"
            type="number"
            register={register}
            error={errors.totalPages}
          />

          <Button type="submit" disabled={isLoading} className={css.addButton}>
            {isLoading ? "Adding..." : "Add book"}
          </Button>
        </form>
      </div>
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
  );
};

export default LibraryDashboard;
