import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "@redux/auth/authOperations";
import { selectIsLoggedIn, selectIsRefreshing } from "@redux/auth/authSlice";
// Компоненти для захисту роутів
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import RegisterPage from "@pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "@pages/LoginPage/LoginPage.jsx";

// Імпорти сторінок (поки що заглушки)
// import WelcomePage from '../pages/WelcomePage';
// import RecommendedPage from '../pages/RecommendedPage';
// import LibraryPage from '../pages/LibraryPage';
// import ReadingPage from '../pages/ReadingPage';

// Тимчасові заглушки для сторінок
const WelcomePage = () => <div>Welcome Page</div>;
const RecommendedPage = () => <div>Recommended Page</div>;
const LibraryPage = () => <div>Library Page</div>;
const ReadingPage = () => <div>Reading Page</div>;

function AppRoutes() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Перевіряємо токен при завантаженні додатку
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

  // Показуємо loader поки перевіряємо токен
  if (isRefreshing) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#141414",
          color: "#F9F9F9",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Публічні роути */}
      <Route path="/" element={<WelcomePage />} />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Приватні роути */}
      <Route
        path="/recommended"
        element={
          <PrivateRoute>
            <RecommendedPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/library"
        element={
          <PrivateRoute>
            <LibraryPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/reading"
        element={
          <PrivateRoute>
            <ReadingPage />
          </PrivateRoute>
        }
      />

      {/* Редірект для невідомих роутів */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
