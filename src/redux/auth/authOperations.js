import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@utils/axiosConfig";

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signup", credentials);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signin", credentials);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/users/signout");
    return;
  } catch (error) {
    // Навіть якщо запит не вдався, все одно виходимо
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Get Current User
export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const { data } = await api.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Refresh Token
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/users/current/refresh");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
