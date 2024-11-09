import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCampersDetails } from "./operation.js";

const initialState = {
  campers: [],
  camperDetails: null,
  filters: {
    location: "", // Текстове поле для локації
    bodyType: "", // Тип кузова, один варіант
    amenities: {
      AC: false,
      kitchen: false,
      bathroom: false,
      TV: false,
      radio: false,
      refrigerator: false,
      microwave: false,
      gas: false,
      water: false,
    }, // Об'єкт для декількох критеріїв
  },
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  status: "idle",
  camperDetailsStatus: "idle",
  noResults: false,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.campers = [];
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campers = action.payload;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchCampersDetails.pending, (state) => {
        state.camperDetailsStatus = "loading";
      })
      .addCase(fetchCampersDetails.fulfilled, (state, action) => {
        console.log("before");

        state.camperDetailsStatus = "succeeded";
        state.camperDetails = action.payload;
        console.log("after");
        console.log(action.payload);
      })
      .addCase(fetchCampersDetails.rejected, (state) => {
        state.camperDetailsStatus = "failed";
        state.camperDetails = null;
      });
  },
});

export const { setFilters } = campersSlice.actions;
//export const campersReducer = campersSlice.reducer;
export default campersSlice.reducer;
