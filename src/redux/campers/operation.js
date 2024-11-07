import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters, thunkAPI) => {
    try {
      /* const filteredParams = Object.entries(filters).reduce(
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
      const result = await axios.get(BASE_URL);
      return result.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
