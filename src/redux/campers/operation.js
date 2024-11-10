import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters, thunkAPI) => {
    try {
      /*  const filteredParams = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== false) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      console.log("Filtered Params:", filteredParams);
      const result = await axios.get(BASE_URL, {
        params: filteredParams,
      }); */
      const response = await axios.get(BASE_URL);
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
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Помилка під час запиту:", error);
      return rejectWithValue(error.message);
    }
  }
);
