import css from "./AuthLayout.module.css";

function AuthLayout({ children }) {
  return (
    <div className={css.authPage}>
      <div className={css.authWrapper}>{children}</div>
    </div>
  );
}

export default AuthLayout;
