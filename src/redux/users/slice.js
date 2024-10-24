import { createSlice } from '@reduxjs/toolkit';
// import { fetchLiters } from './operations.js';
import { fetchLiters, getUser, updateUser } from './operations.js';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
    user: {},
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
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.items = state.items.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getUser.pending, state => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export default usersSlice.reducer;
