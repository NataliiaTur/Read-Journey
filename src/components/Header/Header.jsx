import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container } from "@components/Container/Container.jsx";
import css from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@redux/auth/authSlice.js";
import { logout } from "@redux/auth/authOperations.js";
import { booksApi } from "@redux/books/booksApi.js"; // ✅ Додано
import {
  showOperationSuccess,
  showErrorNotification,
} from "@utils/notifications.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  console.log("👤 Header user:", user);
  console.log("👤 User name:", user?.name);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      // ✅ Очищаємо RTK Query кеш
      dispatch(booksApi.util.resetApiState());

      showOperationSuccess("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      closeMenu();
      navigate("/");
    } catch (error) {
      showErrorNotification("Logout failed");

      // ✅ Очищаємо RTK Query кеш навіть при помилці
      dispatch(booksApi.util.resetApiState());

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      closeMenu();
      navigate("/");
    }
  };

  // Динамічна перша літера
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.headerContent}>
            {/* Logo */}
            <Link to="/recommended" className={css.logo}>
              <svg className={css.logoIcon} width="42" height="17">
                <use href="/icons.svg#icon-LogoMin"></use>
              </svg>
              <span className={css.logoText}>Read Journey</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={css.nav}>
              <NavLink
                to="/recommended"
                className={({ isActive }) =>
                  `${css.navLink} ${css.navLinkHome} ${
                    isActive ? css.navLinkActive : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${css.navLink} ${css.navLinkLibrary} ${
                    isActive ? css.navLinkActive : ""
                  }`
                }
              >
                My Library
              </NavLink>
            </nav>

            {/* User Block */}
            <div className={css.userBlock}>
              <div className={css.avatar}>
                <span className={css.avatarLetter}>{userInitial}</span>
              </div>
              <span className={css.userName}>{user?.name || "User"}</span>
              <button
                type="button"
                onClick={handleLogout}
                className={css.logoutBtn}
              >
                Log out
              </button>

              {/* Burger */}
              <button
                className={css.burgerBtn}
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg className={css.iconBurger} width="28" height="28">
                  <use href="/icons.svg#icon-burger"></use>
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={css.overlay} onClick={closeMenu}>
          <div className={css.sidebar} onClick={(e) => e.stopPropagation()}>
            <button
              className={css.closeBtn}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 32 32">
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.2857"
                  d="M24 8l-16 16"
                  fill="none"
                />
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.2857"
                  d="M8 8l16 16"
                  fill="none"
                />
              </svg>
            </button>

            <nav className={css.mobileNav}>
              <NavLink
                to="/recommended"
                className={({ isActive }) =>
                  `${css.mobileNavLink} ${css.mobileNavLinkHome} ${
                    isActive ? css.mobileNavLinkActive : ""
                  }`
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${css.mobileNavLink} ${css.mobileNavLinkLibrary} ${
                    isActive ? css.mobileNavLinkActive : ""
                  }`
                }
                onClick={closeMenu}
              >
                My Library
              </NavLink>
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className={css.mobileLogoutBtn}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
