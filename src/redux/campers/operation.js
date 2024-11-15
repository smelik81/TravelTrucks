import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";
//axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const formatFilters = (filters) => {
  const params = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value === "" || value === null || value === undefined) continue;

    if (key === "vehicleType" && value) {
      params["vehicleType"] = value;
    }

    if (key === "transmission") {
      params[key] = "automatic";
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        params[item] = true;
      });
    } else {
      params[key] = value;
    }
  }

  return params;
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, thunkAPI) => {
    try {
      console.log("Початок фетчу campers");
      const formattedFilters = formatFilters(filters);
      console.log("Форматовані фільтри:", formattedFilters);

      const response = await axios.get(BASE_URL, {
        params: formattedFilters,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCampersDetails = createAsyncThunk(
  "campers/fetchCamperDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
