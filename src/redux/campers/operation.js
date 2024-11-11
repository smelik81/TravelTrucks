import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, thunkAPI) => {
    try {
      const formatFilters = (filters) => {
        const params = {};
        for (const [key, value] of Object.entries(filters)) {
          // Пропускаємо порожні значення
          if (value === "" || value === null || value === undefined) continue;

          // Якщо value — це об'єкт, розгортаємо його
          if (typeof value === "object" && value !== null) {
            for (const [subKey, subValue] of Object.entries(value)) {
              if (subValue) params[subKey] = subValue; // Додаємо тільки істинні значення
            }
          } else {
            params[key] = value;
          }
        }
        return params;
      };
      const formattedFilters = formatFilters(filters);

      const response = await axios.get("/campers", {
        params: formattedFilters,
      });
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
