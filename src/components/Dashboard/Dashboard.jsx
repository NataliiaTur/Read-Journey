import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterBooksSchema } from "../../schemas/validationSchemas.js";
import {
  setFilters,
  clearFilters,
  selectFilters,
} from "../../redux/books/booksSlice.js";
import { showInfoNotification } from "@utils/notifications.jsx";
import { Button } from "@components/Button/Button.jsx";
import Icon from "@components/Icon/Icon.jsx";
import css from "./Dashboard.module.css";
import FloatingLabelInput from "../FloatingLabelInput/FloatingLabelInput.jsx";

const Dashboard = ({ type, onFiltersApply, isPublic = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector(selectFilters);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(filterBooksSchema),
    defaultValues: { title: "", author: "" },
  });

  // Обробник для публічного режиму
  const handlePublicAction = (e) => {
    if (isPublic) {
      e.preventDefault();
      showInfoNotification("Please login to use this feature");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  const onSubmit = async (data) => {
    // Якщо публічний режим - редірект на логін
    if (isPublic) {
      showInfoNotification("Please login to use filters");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    dispatch(setFilters(data));

    if (onFiltersApply) {
      onFiltersApply();
    }

    setTimeout(() => {
      reset({ title: "", author: "" });
    }, 500);
  };

  return (
    <div className={css.dashboard}>
      {/* Filters Block */}
      <div className={css.filtersBlock}>
        <div className={css.filtersWrapper}>
          <h2 className={css.title}>Filters</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            {/* Title input - блокуємо для неавторизованих */}
            <div onClick={handlePublicAction}>
              <FloatingLabelInput
                id="title"
                labelName="Book title"
                placeholder="Enter text"
                register={register}
                error={errors.title}
                disabled={isPublic}
                className={isPublic ? css.disabledInput : ""}
              />
            </div>

            {/* Author input - блокуємо для неавторизованих */}
            <div onClick={handlePublicAction}>
              <FloatingLabelInput
                id="author"
                labelName="The author"
                placeholder="Enter text"
                register={register}
                error={errors.author}
                disabled={isPublic}
                className={isPublic ? css.disabledInput : ""}
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className={`${css.applyButton} ${
                isPublic ? css.disabledButton : ""
              }`}
            >
              To apply
            </Button>
          </form>
        </div>

        {/* Instructions Block */}
        <div className={css.instructionsBlock}>
          <h3 className={css.instructionsTitle}>Start your workout</h3>
          <ol className={css.instructionsList}>
            <li className={css.instructionItem}>
              <span className={css.stepNumber}>1</span>
              <p className={css.stepText}>
                <span className={css.stepTextSpan}>
                  Create a personal library:
                </span>{" "}
                add the books you intend to read to it.
              </p>
            </li>
            <li className={css.instructionItem}>
              <span className={css.stepNumber}>2</span>
              <p className={css.stepText}>
                <span className={css.stepTextSpan}>
                  Create your first workout:
                </span>{" "}
                define a goal, choose a period, start training.
              </p>
            </li>
          </ol>

          {/* My library link - редірект на логін для неавторизованих */}
          <a
            href={isPublic ? "#" : "/library"}
            className={css.libraryLink}
            onClick={isPublic ? handlePublicAction : undefined}
          >
            <span>My library</span>
            <Icon name="log-in" className={css.arrowIcon} />
          </a>
        </div>

        {/* Quote Block */}
        <div className={css.quoteBlock}>
          <Icon name="book" className={css.quoteIcon} />
          <p className={css.quoteText}>
            "Books are <span className={css.highlight}>windows</span> to the
            world"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
