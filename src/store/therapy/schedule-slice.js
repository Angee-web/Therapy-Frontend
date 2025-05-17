
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../auth-slice.js/api";



// Async thunk for posting a new schedule
export const postSchedule = createAsyncThunk(
  "schedule/postSchedule",
  async (scheduleData, { rejectWithValue }) => {
    try {
      // Make the API request
      const response = await api.post(`/schedule`, scheduleData);

      // Extract the schedule data from the response
      const newSchedule = response.data?.newSchedule;

      if (newSchedule) {
        // Save the schedule ID and other relevant data to localStorage
        localStorage.setItem("scheduleId", newSchedule._id);
        localStorage.setItem("appointmentDate", newSchedule.appointmentDate);
        localStorage.setItem("appointmentTime", newSchedule.appointmentTime);
        localStorage.setItem("scheduleData", JSON.stringify(newSchedule));

        // console.log("Saved to localStorage:", {
        //   scheduleId: newSchedule._id,
        //   appointmentDate: newSchedule.appointmentDate,
        //   appointmentTime: newSchedule.appointmentTime,
        //   scheduleData: newSchedule,
        // });
      } else {
        // console.warn("Schedule data not found in the response.");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


// Async thunk for getting all schedules
export const getAllSchedules = createAsyncThunk(
  "schedule/getAllSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/schedule`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


// Async thunk for getting a schedule by ID
export const getScheduleById = createAsyncThunk(
  "schedule/getScheduleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/schedule/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async thunk for updating a schedule
export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/schedule/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


// Async thunk for deleting a schedule
export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(
        `/schedule/${id}`
      );
      return { id }; // Return the ID of the deleted schedule
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


export const fetchUserSchedules = createAsyncThunk(
  "schedule/fetchUserSchedules",
  async (userId, { rejectWithValue }) => {
    try {
      // ßconsole.log("Fetching schedules for user ID:", userId); // Debugging log
      const response = await api.get(`/schedule/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching schedules"
      );
    }
  }
);

// Schedule Slice
const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedules: [], // Holds all schedules
    schedule: null, // Holds a single schedule
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetScheduleState: (state) => {
      state.schedule = null;
      state.schedules = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Schedule
      .addCase(postSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.newSchedule;
        state.success = true;
      })
      .addCase(postSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get All Schedules
      .addCase(getAllSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(getAllSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Schedule by ID
      .addCase(getScheduleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        console.log("Fetched schedule payload:", action.payload);
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(getScheduleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Schedule
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.updatedSchedule;
        state.success = true;
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Schedule
      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(
          (schedule) => schedule._id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserSchedules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserSchedules.fulfilled, (state, action) => {
  console.log("Fetched Schedules:", action.payload);
  state.status = "succeeded";
  state.schedules = action.payload.data; // Ensure only the array is stored
})
      .addCase(fetchUserSchedules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetScheduleState } = scheduleSlice.actions;

export default scheduleSlice.reducer;