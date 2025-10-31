import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "@redux/auth/authSlice";

/**
 * Компонент для захисту приватних роутів
 * Перенаправляє неавторизованих користувачів на сторінку login
 */
function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Якщо йде перевірка токена - не редіректимо
  if (isRefreshing) {
    return null;
  }

  // Якщо не авторизований - редірект на login
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
