import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/auth/authOperations";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/authSlice";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "@components/MainLayout/MainLayout";

// Імпорти сторінок
import RegisterPage from "@pages/RegisterPage/RegisterPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import RecommendedPage from "@pages/RecommendedPage/RecommendedPage.jsx";

// Тимчасові заглушки для сторінок
const WelcomePage = () => <div>Welcome Page</div>;
const LibraryPage = () => <div>Library Page</div>;
const ReadingPage = () => <div>Reading Page</div>;

const AppRoutes = () => {
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

      {/* Приватні роути з MainLayout */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
      </Route>

      {/* Редірект для невідомих роутів */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
