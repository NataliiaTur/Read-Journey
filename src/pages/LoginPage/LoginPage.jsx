import AuthLayout from "@components/AuthLayout/AuthLayout.jsx";
import css from "./LoginPage.module.css";
import LoginForm from "@components/LoginForm/LoginForm.jsx";
import { Link } from "react-router-dom";
import Phone from "@components/Phone/Phone.jsx";

function LoginPage() {
  return (
    <AuthLayout>
      <div className={css.authContainer}>
        {/* Лівий блок з формою */}
        <div className={css.authBlock}>
          <div className={css.authContent}>
            <div className={css.logo}>
              <svg className={css.logoIcon} width="42" height="17">
                <use href="icons.svg#icon-LogoMin"></use>
              </svg>
              <span className={css.logoText}>ReadJourney</span>
            </div>

            <h1 className={css.authTitle}>
              Expand your mind, reading{" "}
              <span className={css.mainTitleWord}>a book</span>
            </h1>

            <LoginForm />
          </div>
        </div>

        <Phone />
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
