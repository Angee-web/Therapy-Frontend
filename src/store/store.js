//Firstly i need to install redux toolkit and react-redux
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice.js/index"
import therapistsReducer from "./therapy/therapist-slice";
import questionnaireReducer from "./therapy/question-slice";
import scheduleReducer from "./therapy/schedule-slice";
import paymentReducer from "./therapy/payment-slice";
import userReducer from "./users/index"
import priceReducer from "./therapy/price-slice";

// This store will be created on global reducer and it will hold all the application state
// And I will be using redux toolkit to create the store and all the slices which will entail a lot of slices e.g AuthSlice, AdminSlice, ShoppingSlice, etc
// So basically this is my doc for the store and all the slices

const store = configureStore({
  reducer: {
    // This is where I added all the slices
    auth: authReducer,
    therapists: therapistsReducer,
    questionnaire: questionnaireReducer,
    schedule: scheduleReducer,
    payment: paymentReducer,
    users: userReducer,
    prices: priceReducer,
  },
});

export default store;
// This is the store that I will be using in the main.jsx file