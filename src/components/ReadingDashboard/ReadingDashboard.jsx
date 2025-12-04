import { useState } from "react";
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
import css from "./ReadingDashboard.module.css";

const readingSchema = yup.object().shape({
  page: yup
    .number()
    .required("Page is required")
    .positive("Page must be positive")
    .integer("Page must be an integer"),
});

const ReadingDashboard = ({ book, onReadingStateChange }) => {
  const [isReading, setIsReading] = useState(false);
  const [startReading] = useStartReadingMutation();
  const [finishReading] = useFinishReadingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(readingSchema),
    defaultValues: {
      page: 0,
    },
  });

  const currentPage = watch("page");

  const onSubmit = async (data) => {
    try {
      if (!isReading) {
        // Почати читання
        await startReading({
          bookId: book._id,
          page: Number(data.page),
        }).unwrap();
        setIsReading(true);
        onReadingStateChange(true);
        showOperationSuccess("readingStarted");
      } else {
        // Закінчити читання
        await finishReading({
          bookId: book._id,
          page: Number(data.page),
        }).unwrap();
        setIsReading(false);
        onReadingStateChange(false);
        showOperationSuccess("readingFinished");
      }
    } catch (error) {
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
            placeholder="0"
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
    </div>
  );
};

export default ReadingDashboard;
