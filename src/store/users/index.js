import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../auth-slice.js/api";



// Initial state for the user slice
const initialState = {
  users: [],
  user: null, // Store a single user fetched by email
  isLoading: false,
  error: null,
  success: false,
};

// Thunk to fetch all users from the backend
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/users`); // Adjust URL if necessary
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

// Thunk to get a user by email
export const getUserByEmail = createAsyncThunk(
  "users/getUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/users/email/${email}`); // Adjust URL if necessary
      return response.data.user; // Return the user data from the response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user by email"
      );
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/users/${id}`); // Adjust URL if necessary
      return response.data; // Return the user data from the response
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user by id"
      );
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users cases
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data || []; // Ensure action.payload.data
        state.success = true;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
        state.success = false;
      })

      // Fetch user by email cases
      .addCase(getUserByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload || null; // Store the fetched user
        state.success = true;
        state.error = null;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user by email";
        state.success = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        // console.log("Error fetching user:", action.payload);
        state.isLoading = false;
        state.user = action.payload || null; // Store the fetched user
        state.success = true;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch user by id";
        state.success = false;
      });
  },
});

export default userSlice.reducer;
