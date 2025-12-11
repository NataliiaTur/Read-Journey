import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import logout from "../redux/auth/authSlice.js";
import { persistor } from "../redux/store.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Base query з автоматичним logout при 401 Unauthorized
 * Використовується для всіх API (booksApi, authApi)
 */
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);

  //Якщо 401 Unauthorized → автоматичний logout + редірект на /login
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());

    await persistor.purge();

    window.location.href = "/login";
  }

  return result;
};
