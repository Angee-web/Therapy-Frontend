import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../auth-slice.js/api";

// Async Thunks

// Create Package Prices
export const createPackagePrices = createAsyncThunk(
  "prices/createPackagePrices",
  async (prices, { rejectWithValue }) => {
    try {
      const response = await api.post(`/prices/create`, { prices });
    //   console.log("Create Package Prices Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
    //   console.error("Error creating package prices:", error); // Debug log
      return rejectWithValue(error.response?.data || "Failed to create package prices");
    }
  }
);

// Get All Package Prices
export const getPackagePrices = createAsyncThunk(
  "prices/getPackagePrices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/prices`);
    //   console.log("Get Package Prices Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
    //   console.error("Error fetching package prices:", error); // Debug log
      return rejectWithValue(error.response?.data || "Failed to fetch package prices");
    }
  }
);

// Update Package Prices
export const updatePackagePrices = createAsyncThunk(
  "prices/updatePackagePrices",
  async ({ id, prices }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/prices/${id}`, { prices });
    //   console.log("Update Package Prices Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
    //   console.error("Error updating package prices:", error); // Debug log
      return rejectWithValue(error.response?.data || "Failed to update package prices");
    }
  }
);

// Delete a Package Price
export const deletePackagePrice = createAsyncThunk(
  "prices/deletePackagePrice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/prices/${id}`);
    //   console.log("Delete Package Price Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
    //   console.error("Error deleting package price:", error); // Debug log
      return rejectWithValue(error.response?.data || "Failed to delete package price");
    }
  }
);

// Get a Package Price by ID
export const getPackagePriceById = createAsyncThunk(
  "prices/getPackagePriceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/prices/${id}`);
      console.log("Get Package Price by ID Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("Error fetching package price by ID:", error); // Debug log
      return rejectWithValue(error.response?.data || "Failed to fetch package price");
    }
  }
);

// Slice
const priceSlice = createSlice({
  name: "prices",
  initialState: {
    prices: {}, // Ensure prices is initialized as an empty object
    price: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Package Prices
    builder
      .addCase(createPackagePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Create Package Prices Pending"); // Debug log
      })
      .addCase(createPackagePrices.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Create Package Prices Fulfilled:", action.payload); // Debug log
        state.prices = { ...state.prices, ...action.payload.packagePrices };
      })
      .addCase(createPackagePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Create Package Prices Rejected:", action.payload); // Debug log
      });

    // Get All Package Prices
    builder
      .addCase(getPackagePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
        // console.log("Get Package Prices Pending"); // Debug log
      })
      .addCase(getPackagePrices.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Get Package Prices Fulfilled:", action.payload); // Debug log
        state.prices = action.payload.reduce((acc, item) => {
          acc[item.name] = item.price;
          return acc;
        }, {});
      })
      .addCase(getPackagePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.error("Get Package Prices Rejected:", action.payload); // Debug log
      });

    // Update Package Prices
    builder
      .addCase(updatePackagePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
        // console.log("Update Package Prices Pending"); // Debug log
      })
      .addCase(updatePackagePrices.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Update Package Prices Fulfilled:", action.payload); // Debug log
        state.prices = action.payload.packagePrices;
      })
      .addCase(updatePackagePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Update Package Prices Rejected:", action.payload); // Debug log
      });

    // Delete a Package Price
    builder
      .addCase(deletePackagePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Delete Package Price Pending"); // Debug log
      })
      .addCase(deletePackagePrice.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Delete Package Price Fulfilled:", action.payload); // Debug log
        state.prices = state.prices.filter((price) => price._id !== action.meta.arg);
      })
      .addCase(deletePackagePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Delete Package Price Rejected:", action.payload); // Debug log
      });

    // Get a Package Price by ID
    builder
      .addCase(getPackagePriceById.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Get Package Price by ID Pending"); // Debug log
      })
      .addCase(getPackagePriceById.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Get Package Price by ID Fulfilled:", action.payload); // Debug log
        state.price = action.payload;
      })
      .addCase(getPackagePriceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.error("Get Package Price by ID Rejected:", action.payload); // Debug log
      });
  },
});

// Export Actions
export const { clearError } = priceSlice.actions;

// Export Reducer
export default priceSlice.reducer;