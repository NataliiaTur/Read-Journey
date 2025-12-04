// src/utils/notifications.js
import { toast } from "react-toastify";

// Базові налаштування для всіх toast
const defaultToastOptions = {
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Success notification
export const showSuccessNotification = (message) => {
  toast.success(message, {
    ...defaultToastOptions,
    autoClose: 3000,
  });
};

// Error notification
export const showErrorNotification = (message) => {
  toast.error(message, {
    ...defaultToastOptions,
    autoClose: 4000,
  });
};

// Info/Warning notification
export const showInfoNotification = (message) => {
  toast.info(message, {
    ...defaultToastOptions,
    autoClose: 3000,
  });
};

// Warning notification
export const showWarningNotification = (message) => {
  toast.warning(message, {
    ...defaultToastOptions,
    autoClose: 3000,
  });
};

// Обробка помилок API (для axios і RTK Query)
export const handleApiError = (error) => {
  let errorMessage = "Something went wrong. Please try again.";

  // ✅ Для RTK Query errors
  if (error?.data) {
    errorMessage = error.data?.message || error.data?.error || errorMessage;
  }
  // ✅ Для axios errors
  else if (error?.response) {
    errorMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      `Error: ${error.response.status}`;
  }
  // Запит відправлений, але відповіді немає
  else if (error?.request) {
    errorMessage = "No response from server. Please check your connection.";
  }
  // Інша помилка
  else if (error?.message) {
    errorMessage = error.message;
  }

  showErrorNotification(errorMessage);
  return errorMessage;
};

// ✅ Успішна операція з готовими повідомленнями
export const showOperationSuccess = (operation) => {
  const messages = {
    register: "Registration successful! Welcome!",
    login: "Login successful! Welcome back!",
    logout: "Logged out successfully",
    bookAdded: "Book added to your library!",
    bookRemoved: "Book removed from your library",
    bookAlreadyInLibrary: "This book is already in your library!",
    readingStarted: "Reading session started!",
    readingFinished: "Reading session completed!",
    readingStopped: "Reading session completed!",
    bookFinished: "Congratulations! Book finished!",
    readingDeleted: "Reading record deleted",
  };

  showSuccessNotification(messages[operation] || "Operation successful!");
};

// ✅ Помилки операцій з готовими повідомленнями
export const showOperationError = (operation) => {
  const messages = {
    register: "Registration failed. Please try again.",
    login: "Login failed. Check your credentials.",
    logout: "Logout failed. Please try again.",
    bookAdded: "Failed to add book. Please try again.",
    bookRemoved: "Failed to remove book. Please try again.",
    bookAlreadyInLibrary: "This book is already in your library!",
    bookNotSelected: "Please select a book first",
    readingStarted: "Failed to start reading session",
    readingStopped: "Failed to stop reading session",
    bookFinished: "Failed to finish book",
    readingDeleted: "Failed to delete reading record",
    loadData: "Failed to load data. Please refresh the page.",
  };

  showErrorNotification(
    messages[operation] || "Operation failed. Please try again."
  );
};
