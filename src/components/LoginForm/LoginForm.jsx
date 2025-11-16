import { useState } from "react";
import { useAuthForm } from "@hooks/useAuthForm";
import { loginSchema } from "@schemas/validationSchemas.js";
import { Link } from "react-router-dom";
import Icon from "@components/Icon/Icon.jsx";
import { Button } from "@components/Button/Button.jsx";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors, isLoading, watch } = useAuthForm(
    loginSchema,
    "login"
  );

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Відстежуємо значення полів для валідації
  const watchAllFields = watch();
  const emailValue = watchAllFields?.email || "";
  const passwordValue = watchAllFields?.password || "";

  // Перевірка валідності
  const isEmailValid =
    emailValue &&
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailValue) &&
    !errors.email;
  const isPasswordValid =
    passwordValue && passwordValue.length >= 7 && !errors.password;

  // універсальний рендер для полів
  const renderInputField = (id, labelName, valueLabel, type = "text") => {
    const isPassword = id === "password";
    const value = id === "email" ? emailValue : passwordValue;
    const isValid = id === "email" ? isEmailValid : isPasswordValid;

    return (
      <div
        className={`${css.formGroup} ${isPassword ? css.passwordGroup : ""}`}
        data-field={id}
      >
        <div className={css.inputWrapper}>
          <input
            {...register(id)}
            type={isPassword && showPassword ? "text" : type}
            id={id}
            placeholder=" "
            className={`${css.formInput} ${
              errors[id] ? css.formInputError : ""
            } ${isValid ? css.formInputSuccess : ""}`}
            disabled={isLoading}
          />

          {/* Placeholder */}
          <div className={css.placeholderLabel}>
            <span className={css.labelName}>{labelName}: </span>
            <span className={css.labelValue}>{valueLabel}</span>
          </div>

          {/* Якщо це поле password — додаємо іконку 👁️ */}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={css.passwordToggle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon id={showPassword ? "icon-eye-off" : "icon-eye"} size={22} />
            </button>
          )}
        </div>

        {/* Повідомлення про помилку */}
        {errors[id] && (
          <span className={css.formError}>{errors[id].message}</span>
        )}

        {/* Повідомлення про успіх */}
        {!errors[id] && isValid && (
          <span className={css.formSuccess}>
            {id === "email" && "Email is correct"}
            {id === "password" && "Password is secure"}
          </span>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className={css.authForm}>
      {renderInputField("email", "Mail", "your@email.com", "email")}
      {renderInputField("password", "Password", "Yourpasswordhere", "password")}

      <div className={css.wrapperButtonLink}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className={css.submitButton}
        >
          {isLoading ? "Loading..." : "Log In"}
        </Button>

        <Link to="/register" className={css.authLink}>
          Don't have an account?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
