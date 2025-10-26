import { toast } from "react-toastify";

// для показу нотіфікацій
export const showSuccessNotification = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showErrorNotification = (messsage) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showInfoNotification = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// помилка з бекенду
export const handleApiError = (error) => {
  let errorMessage = "Something went wrong. Please try again.";

  if (error.response) {
    // Помилка з відповіді сервера
    errorMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      `Error: ${error.response.status}`;
  } else if (error.request) {
    // Запит був відправлений, але відповіді немає
    errorMessage = "No response from server. Please check your connection.";
  } else if (error.message) {
    // Інша помилка
    errorMessage = error.message;
  }

  showErrorNotification(errorMessage);
  return errorMessage;
};

// успішна операція
export const showOperationSuccess = (operation) => {
  const messages = {
    register: 'Registration successful! Welcome!',
    login: 'Login successful! Welcome back!',
    logout: 'Logged out successfully',
    bookAdded: 'Book added to your library!',
    bookRemoved: 'Book removed from your library',
    readingStarted: 'Reading session started!',
    readingStopped: 'Reading session completed!',
    bookFinished: 'Congratulations! Book finished!',
    readingDeleted: 'Reading record deleted',
  };

  showSuccessNotification(messages[operation] || 'Operation successful!');