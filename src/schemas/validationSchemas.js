import * as Yup from "yup";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(emailPattern, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

// Login Schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailPattern, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});

// Add Book Schema
export const addBookSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Book title is required")
    .max(200, "Title must be less than 200 characters")
    .required("Book title is required"),
  author: Yup.string()
    .min(1, "Author name is required")
    .max(100, "Author name must be less than 100 characters")
    .required("Author name is required"),
  totalPages: Yup.number()
    .positive("Number of pages must be positive")
    .integer("Number of pages must be an integer")
    .min(1, "Book must have at least 1 page")
    .max(10000, "Number of pages seems unrealistic")
    .required("Number of pages is required"),
  imageUrl: Yup.string().nullable(),
});

// Filter Books Schema
export const filterBooksSchema = Yup.object().shape({
  title: Yup.string().max(200, "Title must be less than 200 characters"),
  author: Yup.string().max(100, "Author name must be less than 100 characters"),
});

// Reading Page Schema
export const readingPageSchema = Yup.object().shape({
  page: Yup.number()
    .integer("Page number must be an integer")
    .min(0, "Page number cannot be negative")
    .required("Page number is required"),
});
