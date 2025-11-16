import css from "./Icon.module.css";

const Icon = ({ name, className = "", size = 24, ...props }) => {
  return (
    <svg
      className={`${css.icon} ${className}`}
      width={size}
      height={size}
      {...props}
    >
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;
