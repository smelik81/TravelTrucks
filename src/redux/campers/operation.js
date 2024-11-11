import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
        {
          params: filters,
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data.items;
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
      console.error("Помилка під час запиту:", error);
      return rejectWithValue(error.message);
    }
  }
);
