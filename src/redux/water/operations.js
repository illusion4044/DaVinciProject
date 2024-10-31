import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

axios.defaults.baseURL = 'https://dark-side-of-the-app01.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const updatePortionThunk = createAsyncThunk(
  'water/updatePortion',
  async ({ id, ...restCredentials }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);

    if (!id) {
      return rejectWithValue('ID is missing or undefined.');
    }
    try {
      const response = await axios.patch(`/water/${id}`, restCredentials);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const updateWaterRateThunk = createAsyncThunk(
  'water/updateWaterRate',
  async ({ dailyNorm }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }
    setAuthHeader(token);
    try {
      const response = await axios.patch(`/users/norm`, {dailyNorm});
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const fetchMonthlyPortionsThunk = createAsyncThunk(
  'water/fetchWaterByMonth',
  async (date, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);

    const formattedDate = format(new Date(date), 'yyyy-MM');

    try {
      const response = await axios.get('/water/month', {
        params: { date: formattedDate },
      });
      console.log(response.data)
      return response.data.data.waterData;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const fetchDailyPortionsThunk = createAsyncThunk(
  'water/fetchDailyPortions',
  async (date, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token found');
    }

    setAuthHeader(token);
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    try {
      const response = await axios.get('/water/day', {
        params: { date: formattedDate },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  }
);


export const addWaterPortionThunk = createAsyncThunk(
  'water/addWaterPortion',
  async ({ date, volume }, { rejectWithValue, getState }) => {


    try {
      const token = getState().auth.token;
      console.log(token)
      // if (!token) {
      //   return rejectWithValue('No token found');
      // }
      // setAuthHeader(token);
      const payload = { date, volume };
      const response = await axios.post('/water', payload);
      if (response.status === 201) {

        return response.data;
      } else {
        throw new Error(`Unexpected response code: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'An unknown error occurred'
      );
    }
  }
);


export const deletePortionThunk = createAsyncThunk(
  'water/deletePortion',
  async (id, { rejectWithValue, getState }) => {
    if (!id) {
      return rejectWithValue('No valid ID provided');
    }
    try {
      const token = getState().auth.token; 
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await axios.delete(`/water/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'An unknown error occurred'
      );
    }
  }
);

