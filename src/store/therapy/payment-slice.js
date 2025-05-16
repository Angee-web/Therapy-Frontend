import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../auth-slice.js/api";
// import axios from "axios";


// Async thunk for initializing the therapy payment
export const initializePayment = createAsyncThunk(
  "payment/initializePayment",
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/therapyPayment/initialize",
        paymentDetails
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for verifying the therapy payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post("/therapyPayment/verify", {
        reference: paymentData.reference,
        packageId: paymentData.packageId, // Include packageId
      });

      if (response.data.status === "success") {
        return response.data; // Include package data in the return value
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




// Slice to manage payment state
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentUrl: null,
    scheduleId: null,
    paymentStatus: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentUrl = null;
      state.scheduleId = null;
      state.paymentStatus = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle payment initialization
      .addCase(initializePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload.paymentUrl;
        state.scheduleId = action.payload.packageId; // Assuming `packageId` is returned
        state.paymentStatus = "initialized";
      })
      .addCase(initializePayment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error.message ||
          "Failed to initialize payment";
      })

      // Handle payment verification
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = "verified";
        state.scheduleId = action.payload.package?._id; // Assuming `package` exists in response
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error.message ||
          "Failed to verify payment";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
