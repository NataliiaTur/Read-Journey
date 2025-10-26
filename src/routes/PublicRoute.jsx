import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSlice.js";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // якщо авторизов, то редірект на рекоммендед
  return isLoggedIn ? <Navigate to="/recommended" replace /> : children;
}

export default PublicRoute;
