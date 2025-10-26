import axios from "axios";

// Базовий URL API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Створюємо екземпляр axios
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor для додавання токена до кожного запиту
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обробки відповідей та помилок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Якщо токен протермінований (401) і це не повторний запит
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Спроба оновити токен
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(
          `${BASE_URL}/users/current/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        // Зберігаємо новий токен
        localStorage.setItem("token", data.token);

        // Повторюємо оригінальний запит з новим токеном
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Якщо оновлення токена не вдалося - виходимо
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
