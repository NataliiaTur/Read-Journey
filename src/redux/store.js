import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";
import { booksApi } from "./books/booksApi";

// Middleware для збереження токена в localStorage
const tokenMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Зберігаємо токен після успішної авторизації
  if (
    action.type === "auth/login/fulfilled" ||
    action.type === "auth/register/fulfilled"
  ) {
    const { token } = store.getState().auth;
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  // Видаляємо токен після logout
  if (
    action.type === "auth/logout/fulfilled" ||
    action.type === "auth/logout"
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware).concat(tokenMiddleware),
});

export default store;
