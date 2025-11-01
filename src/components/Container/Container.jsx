import css from "./Container.module.css";
import clsx from "clsx";

export const Container = ({ children, className }) => {
  return (
    <div className={clsx(css.container, className && className)}>
      {children}
    </div>
  );
};
