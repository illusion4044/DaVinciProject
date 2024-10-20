import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '';


export const updatePortionThunk = createAsyncThunk(
  'water/updatePortion',
  async (newDailyNorma, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/water`, newDailyNorma);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchMonthlyPortionsThunk = createAsyncThunk(
  'water/fetchMonthlyPortions',
  async (currentDate, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/water?date=${currentDate}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
