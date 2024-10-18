import { createSlice } from '@reduxjs/toolkit';
import { updatePortionThunk, fetchMonthlyPortionsThunk } from './operations';

const initialState = {
  dailyNorma: null,
  monthlyPortions: [],
  isLoading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    changeDailyNorma(state, action) {
      state.dailyNorma = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updatePortionThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePortionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyNorma = action.payload;
      })
      .addCase(updatePortionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMonthlyPortionsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyPortionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlyPortions = action.payload;
      })
      .addCase(fetchMonthlyPortionsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changeDailyNorma } = waterSlice.actions;
export default waterSlice.reducer;
