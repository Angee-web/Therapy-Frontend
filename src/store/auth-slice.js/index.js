import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

// import * as jwt_decode from "jwt-decode";

// Initial state
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  userList: [],
};


// Redux Thunks and other code remain unchanged
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/register`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during registration"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, formData);
      // console.log("Login Response", response.data);
      // console.log("Login api", api);
      // Check if the token exists in the response
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token); // Store token on successful login
      } else {
        throw new Error("Token not found in the response");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during login"
      );
    }
  }
);


// Logout user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token"); // Clear token on logout
      localStorage.removeItem("intendedRoute"); // Clear intended route on logout
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred during logout"
      );
    }
  }
);


export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      // Make the API call to check authentication
      const response = await api.get(`/auth/check-auth`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Expires: 0,
        },
      });

      // console.log("TOKEN", token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }

      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "/auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "/auth/verify-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  }
);




// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Logout user cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message; // Optional: Save success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Optional: Save error message
      })

      // Reset Password cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message; // Optional: Save success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Optional: Save error message
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message; // Save success message
        state.isOtpVerified = true; // Optional: Add a flag to track OTP verification
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Save error details
        state.isOtpVerified = false;
      });
  },
});

export const { setUser, setIntendedRoute, clearIntendedRoute } =
  authSlice.actions;

export default authSlice.reducer;
