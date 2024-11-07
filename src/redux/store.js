import { configureStore } from "@reduxjs/toolkit";
//import { campersReducer } from "./campers/slice.js";
import campersReducer from "./campers/slice.js";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});
