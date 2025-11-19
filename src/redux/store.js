import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import booksReducer from "./books/booksSlice";
import { booksApi } from "./books/booksApi";

// ✅ Конфігурація persist для auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isLoggedIn"], // Зберігаємо тільки token і user
};
// ✅ Обгортаємо authReducer в persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // ✅ Використовуємо persisted версію
    books: booksReducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ігноруємо redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(booksApi.middleware),
});

// ✅ Створюємо persistor
export const persistor = persistStore(store);

export default store;
