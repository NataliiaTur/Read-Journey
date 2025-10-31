import clsx from "clsx";
import css from "./Button.module.css";

export const Button = ({
  type = "button",
  variant = "primary", // "primary" | "secondary"
  size = "md", // "sm" | "md" | "lg"
  disabled = false,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(css.btn, css[variant], css[size], className)}
    >
      {children}
    </button>
  );
};
