import { createSlice } from '@reduxjs/toolkit';
import {
  updatePortionThunk,
  fetchMonthlyPortionsThunk,
  fetchDailyPortionsThunk,
} from './operations.js';

const initialState = {
  dailyNorma: null,
  monthlyPortions: [],
  dailyPortions: [2000],
  activeContent: 'pictureBottleBg',
  isLoading: false,
  isError: null,
  isOpenDailyNormaModal: false,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    changeDailyNorma(state, action) {
      state.dailyNorma = action.payload;
    },
    changeActiveContent(state, action) {
      state.activeContent = action.payload;
    },
    clearNormaCounterData(state) {
      state.dailyNorma = 0;
      state.isLoading = false;
      state.isError = null;
    },
    changeDailyPortions(state, action) {
      state.dailyPortions = action.payload;
    },
    openDailyModal: state => {
      state.isDailyModalOpen = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDailyPortionsThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchDailyPortionsThunk.fulfilled, (state, { payload }) => {
        state.dailyNorma = payload.result.dailyWaterNorma;
        state.isLoading = false;
      })
      .addCase(fetchDailyPortionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(updatePortionThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updatePortionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailyNorma = action.payload;
      })
      .addCase(updatePortionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchMonthlyPortionsThunk.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchMonthlyPortionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlyPortions = action.payload;
      })
      .addCase(fetchMonthlyPortionsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {
  changeDailyNorma,
  changeActiveContent,
  clearNormaCounterData,
  changeDailyPortions,
  openDailyModal,
} = waterSlice.actions;

export default waterSlice.reducer;
