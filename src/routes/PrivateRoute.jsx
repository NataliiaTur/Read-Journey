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

  if (!isLoggedIn) {
    console.log("❌ PrivateRoute: not logged in, redirecting to /login");
  } else {
    console.log("✅ PrivateRoute: logged in, rendering children");
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
