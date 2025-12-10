import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@redux/auth/authSlice.js";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Компонент для захисту сторінок login/register
 * Перенаправляє авторизованих користувачів на /recommended
 */
function PublicRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  // Тільки для /login та /register редіректимо авторизованих
  if (isLoggedIn) {
    console.log(" PublicRoute: logged in, redirecting to /recommended");
    return <Navigate to="/recommended" replace />;
  }

  console.log("PublicRoute: not logged in, rendering children");
  return children;
}

export default PublicRoute;
