import { createSlice } from '@reduxjs/toolkit';
import { fetchLiters } from './operations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchLiters.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLiters.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchLiters.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export default usersSlice.reducer;
