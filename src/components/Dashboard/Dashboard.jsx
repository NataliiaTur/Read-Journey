import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterBooksSchema } from "../../schemas/validationSchemas.js";
import {
  setFilters,
  clearFilters,
  selectFilters,
} from "../../redux/books/booksSlice.js";
import { Button } from "@components/Button/Button.jsx";
import Icon from "@components/Icon/Icon.jsx";
import css from "./Dashboard.module.css";

const Dashboard = ({ type, onFiltersApply }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(filterBooksSchema),
    defaultValues: filters,
  });

  const onSubmit = (data) => {
    dispatch(setFilters(data));

    if (onFiltersApply) {
      onFiltersApply();
    }
  };

  const handleReset = () => {
    reset({ title: "", author: "" });
    dispatch(clearFilters());

    if (onFiltersApply) {
      onFiltersApply();
    }
  };

  return (
    <div className={css.dashboard}>
      {/* Filters Block */}
      <div className={css.filtersBlock}>
        <div className={css.filtersWrapper}>
          {" "}
          <h2 className={css.title}>Filters</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <div className={css.inputWrapper}>
              <label htmlFor="title" className={css.label}>
                Book title:
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter book title"
                className={css.input}
                {...register("title")}
              />
              {errors.title && (
                <span className={css.error}>{errors.title.message}</span>
              )}
            </div>

            <div className={css.inputWrapper}>
              <label htmlFor="author" className={css.label}>
                The author:
              </label>
              <input
                id="author"
                type="text"
                placeholder="Enter author name"
                className={css.input}
                {...register("author")}
              />
              {errors.author && (
                <span className={css.error}>{errors.author.message}</span>
              )}
            </div>
          </form>
          <Button type="submit" className={css.applyButton}>
            To apply
          </Button>
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
          <a href="/library" className={css.libraryLink}>
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
