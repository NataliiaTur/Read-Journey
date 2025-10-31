import css from "./RegisterPage.module.css";
import AuthLayout from "@components/AuthLayout/AuthLayout.jsx";
import RegisterForm from "@components/RegisterForm/RegisterForm.jsx";
import Phone from "@components/Phone/Phone.jsx";

function RegisterPage() {
  return (
    <AuthLayout>
      <div className={css.authContainer}>
        {/*  лівій блок - форма*/}
        <div className={css.authBlock}>
          <div className={css.authContent}>
            <div className={css.logo}>
              <svg className={css.logoIcon} width="42" height="17">
                <use href="icons.svg#icon-LogoMin"></use>
              </svg>
              <span className={css.logoText}>Read Journey</span>
            </div>

            <h1 className={css.authTitle}>
              Expand your mind, reading{" "}
              <span className={css.mainTitleWord}>a book</span>
            </h1>

            <RegisterForm />
          </div>
        </div>

        <Phone />
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
