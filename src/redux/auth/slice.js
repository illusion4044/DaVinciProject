import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, register } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
    isModalOpen: false,
  },

  reducers: {
    openModal: state => {
      state.isModalOpen = true;
    },
    closeModal: state => {
      state.isModalOpen = false;
    },
    logoutAction: () => {
      return {
        user: {
          name: null,
          email: null,
        },
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
        isLoading: false,
        error: null,
        isModalOpen: false,
      };
    },
  },

  extraReducers: builder =>
    builder
      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // Log In
      .addCase(logIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      // Log Out
      .addCase(logOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      }),
});

export const { openModal, closeModal, logoutAction } = authSlice.actions;
export default authSlice.reducer;
