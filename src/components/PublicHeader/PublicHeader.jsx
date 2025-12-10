import { Link } from "react-router-dom";
import { Container } from "@components/Container/Container.jsx";
import css from "./PublicHeader.module.css";

const PublicHeader = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContent}>
          {/* Logo */}
          <Link to="/" className={css.logo}>
            <svg className={css.logoIcon} width="42" height="17">
              <use href="/icons.svg#icon-LogoMin"></use>
            </svg>
            <span className={css.logoText}>Read Journey</span>
          </Link>

          {/* Auth Buttons */}
          <div className={css.authButtons}>
            <Link to="/login" className={css.loginButton}>
              Log In
            </Link>
            <Link to="/register" className={css.registerButton}>
              Registration
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default PublicHeader;
