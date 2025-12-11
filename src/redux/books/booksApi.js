import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../utils/baseQueryWithReauth.js";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["RecommendedBooks", "UserBooks", "Book", "Reading"],
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: false,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    // Отримати рекомендовані книги
    getRecommendedBooks: builder.query({
      query: ({ page = 1, limit = 10, title = "", author = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (title) params.append("title", title);
        if (author) params.append("author", author);

        return `/books/recommend?${params.toString()}`;
      },
      providesTags: ["RecommendedBooks"],
    }),

    // Отримати книги користувача
    getUserBooks: builder.query({
      query: (status) => {
        const params =
          status && status !== "All books" ? `?status=${status}` : "";
        return `/books/own${params}`;
      },
      providesTags: ["UserBooks"],
    }),

    // Отримати деталі книги
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),

    // Додати нову книгу
    addNewBook: builder.mutation({
      query: (bookData) => ({
        url: "/books/add",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["UserBooks"],
    }),

    // Додати книгу до бібліотеки за ID
    addBookToLibrary: builder.mutation({
      query: (id) => ({
        url: `/books/add/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["UserBooks", "RecommendedBooks"],
    }),

    // Видалити книгу з бібліотеки
    removeBook: builder.mutation({
      query: (id) => ({
        url: `/books/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserBooks"],
    }),

    // Почати читання
    startReading: builder.mutation({
      query: ({ id, page }) => ({
        url: "/books/reading/start",
        method: "POST",
        body: { id, page },
      }),
      invalidatesTags: ["Reading", "UserBooks", "Book"],
    }),

    // Закінчити читання
    finishReading: builder.mutation({
      query: ({ id, page }) => ({
        url: "/books/reading/finish",
        method: "POST",
        body: { id, page },
      }),
      invalidatesTags: ["Reading", "UserBooks", "Book"],
    }),

    // Видалити запис про читання
    deleteReading: builder.mutation({
      query: ({ bookId, readingId }) => ({
        url: `/books/reading?bookId=${bookId}&readingId=${readingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reading", "Book", "UserBooks"],
    }),
  }),
});

export const {
  useGetRecommendedBooksQuery,
  useGetUserBooksQuery,
  useGetBookByIdQuery,
  useAddNewBookMutation,
  useAddBookToLibraryMutation,
  useRemoveBookMutation,
  useStartReadingMutation,
  useFinishReadingMutation,
  useDeleteReadingMutation,
} = booksApi;
