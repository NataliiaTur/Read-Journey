import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container } from "@components/Container/Container.jsx";
import css from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@redux/auth/authSlice.js";
import { logout } from "@redux/auth/authOperations.js";
import {
  showOperationSuccess,
  showErrorNotification,
} from "@utils/notifications.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const userInitial = user?.name?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      showOperationSuccess("logout");

      // Очищення localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      navigate("/");
    } catch (error) {
      showErrorNotification("Logout failed");

      // Навіть при помилці виходимо
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContent}>
          <Link to="/recommended" className={css.logo}>
            <svg className={css.logoIcon} width="182" height="17">
              <use href="icons.svg#icon-LogoDesc"></use>
            </svg>
          </Link>

          <nav className={css.nav}>
            <NavLink
              to="/recommended"
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.navLinkActive : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/library"
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.navLinkActive : ""}`
              }
            >
              My Library
            </NavLink>
          </nav>

          {/* User Info + Logout */}
          <div className={css.userBlock}>
            {/* Avatar з першою літерою */}
            <div className={css.avatar}>
              <span className={css.avatarLetter}>{userInitial}</span>
            </div>

            {/* Ім'я користувача */}
            <span className={css.userName}>{user?.name || "User"}</span>

            {/* Кнопка Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className={css.logoutBtn}
            >
              Log out
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
