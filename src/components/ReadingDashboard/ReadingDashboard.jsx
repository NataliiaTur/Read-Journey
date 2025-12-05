import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useStartReadingMutation,
  useFinishReadingMutation,
} from "@redux/books/booksApi.js";
import { showOperationSuccess, handleApiError } from "@utils/notifications.jsx";
import { Button } from "@components/Button/Button.jsx";
import FloatingLabelInput from "@components/FloatingLabelInput/FloatingLabelInput.jsx";
import Diary from "@components/Diary/Diary.jsx";
import Icon from "@components/Icon/Icon.jsx";
import BookFinishedModal from "@components/BookFinishedModal/BookFinishedModal.jsx";
import css from "./ReadingDashboard.module.css";

const readingSchema = yup.object().shape({
  page: yup
    .number()
    .required("Page is required")
    .positive("Page must be positive")
    .integer("Page must be an integer"),
});

const ReadingDashboard = ({ book, onReadingStateChange, formSubmitRef }) => {
  const hasActiveReading = book.progress?.some(
    (entry) => entry.status === "active"
  );

  const [isReading, setIsReading] = useState(hasActiveReading || false);
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const [startReading] = useStartReadingMutation();
  const [finishReading] = useFinishReadingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(readingSchema),
    defaultValues: {
      page: 1, // ✅ Змінено з 0 на 1
    },
  });

  const currentPage = watch("page");

  // ✅ Зберігаємо функцію submit в ref для виклику ззовні
  useEffect(() => {
    if (formSubmitRef) {
      formSubmitRef.current = handleSubmit(onSubmit);
    }
  }, [formSubmitRef, handleSubmit]);

  // Синхронізуємо стан читання з даними книги
  useEffect(() => {
    const activeEntry = book.progress?.find(
      (entry) => entry.status === "active"
    );
    const hasActive = !!activeEntry;

    setIsReading(hasActive);
    onReadingStateChange(hasActive);

    // ✅ Встановлюємо правильну сторінку в залежності від стану
    if (hasActive && activeEntry?.startPage !== undefined) {
      // Якщо є активне читання - користувач може ввести де зупинився
      // Показуємо startPage, бо він може не прочитати навіть 1 сторінку
      setValue("page", activeEntry.startPage);
    } else if (book.progress?.length > 0) {
      // Якщо є історія - беремо останню завершену сторінку
      const lastEntry = [...book.progress]
        .filter((entry) => entry.status === "inactive" && entry.finishPage)
        .sort(
          (a, b) => new Date(b.finishReading) - new Date(a.finishReading)
        )[0];

      if (lastEntry?.finishPage) {
        // Починаємо з наступної після останньої прочитаної
        setValue("page", lastEntry.finishPage + 1);
      }
    }
    // Якщо немає ніякої історії - залишається дефолтна сторінка 1
  }, [book.progress, onReadingStateChange, setValue]);

  const onSubmit = async (data) => {
    console.log("📝 Form submitted:", {
      isReading,
      page: data.page,
      bookId: book._id,
    });

    try {
      if (!isReading) {
        // Почати читання
        console.log("🚀 Starting reading:", {
          id: book._id,
          page: Number(data.page),
        });

        await startReading({
          id: book._id,
          page: Number(data.page),
        }).unwrap();
        setIsReading(true);
        onReadingStateChange(true);
        showOperationSuccess("readingStarted");

        // ❌ НЕ змінюємо page після старту - користувач сам введе де зупинився
      } else {
        // Закінчити читання
        const stopPage = Number(data.page);

        console.log("🛑 Finishing reading:", {
          id: book._id,
          page: stopPage,
        });

        await finishReading({
          id: book._id,
          page: stopPage,
        }).unwrap();
        setIsReading(false);
        onReadingStateChange(false);
        showOperationSuccess("readingFinished");

        // ✅ Перевіряємо чи книга дочитана
        if (stopPage >= book.totalPages) {
          setShowFinishedModal(true);
        }

        // ✅ Після зупинки встановлюємо наступну сторінку для продовження
        setValue("page", stopPage + 1);
      }
    } catch (error) {
      console.error("❌ Reading error:", error);
      handleApiError(error);
    }
  };

  return (
    <div className={css.readingDashboard}>
      {/* Reading Form */}
      <div className={css.formBlock}>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <h3 className={css.labelReadingDash}>Start page:</h3>
          <FloatingLabelInput
            id="page"
            labelName="Page number"
            placeholder=""
            type="number"
            register={register}
            error={errors.page}
            className={css.inputReadingDashboard}
          />

          <Button type="submit" className={css.submitButton}>
            {isReading ? "To stop" : "To start"}
          </Button>
        </form>
      </div>

      {/* Progress or Diary */}
      {!isReading ? (
        <div className={css.progressBlock}>
          <h3 className={css.progressTitle}>Progress</h3>
          <p className={css.progressText}>
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
          <div className={css.starWrapper}>
            <Icon name="star" className={css.starIcon} />
          </div>
        </div>
      ) : (
        <Diary book={book} />
      )}

      {/* Book Finished Modal */}
      {showFinishedModal && (
        <BookFinishedModal onClose={() => setShowFinishedModal(false)} />
      )}
    </div>
  );
};

export default ReadingDashboard;
