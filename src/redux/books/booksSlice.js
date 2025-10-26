import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendedBooks: [],
  userBooks: [],
  currentBook: null,
  filters: {
    title: "",
    author: "",
  },
  libraryFilter: "All books", // 'All books', 'Unread', 'In progress', 'Done'
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { title: "", author: "" };
    },
    setLibraryFilter: (state, action) => {
      state.libraryFilter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setLibraryFilter,
  setCurrentPage,
  setCurrentBook,
  clearCurrentBook,
  clearError,
} = booksSlice.actions;

export default booksSlice.reducer;

// Selectors
export const selectRecommendedBooks = (state) => state.books.recommendedBooks;
export const selectUserBooks = (state) => state.books.userBooks;
export const selectCurrentBook = (state) => state.books.currentBook;
export const selectFilters = (state) => state.books.filters;
export const selectLibraryFilter = (state) => state.books.libraryFilter;
export const selectPagination = (state) => state.books.pagination;
export const selectBooksLoading = (state) => state.books.isLoading;
export const selectBooksError = (state) => state.books.error;
