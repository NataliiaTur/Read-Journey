import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@redux/auth/authSlice.js";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log("🌍 PublicRoute check:", { isLoggedIn });

  if (isLoggedIn) {
    console.log("✅ PublicRoute: logged in, redirecting to /recommended");
    return <Navigate to="/recommended" replace />;
  } else {
    console.log("❌ PublicRoute: not logged in, rendering children");
  }

  return children;
}

export default PublicRoute;
