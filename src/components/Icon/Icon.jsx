import css from "./Icon.module.css";

const Icon = ({ name, className = "", size, style, ...props }) => {
  return (
    <svg
      className={`${css.icon} ${className}`}
      width={size}
      height={size}
      style={style}
      {...props}
    >
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;
