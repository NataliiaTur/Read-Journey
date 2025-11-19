import css from "./FloatingLabelInput.module.css";

const FloatingLabelInput = ({
  id,
  labelName,
  placeholder,
  type = "text",
  register,
  error,
  value,
}) => {
  return (
    <div className={css.formGroup} data-field={id}>
      <div className={css.inputWrapper}>
        <input
          {...register(id)}
          type={type}
          id={id}
          placeholder=" "
          className={`${css.formInput} ${error ? css.formInputError : ""}`}
        />

        {/* Лейбл всередині інпуту */}
        <div className={css.placeholderLabel}>
          <span className={css.labelName}>{labelName}: </span>
          <span className={css.labelValue}>{placeholder}</span>
        </div>
      </div>

      {error && <span className={css.formError}>{error.message}</span>}
    </div>
  );
};

export default FloatingLabelInput;
