import { createSlice } from '@reduxjs/toolkit';
import {
  updatePortionThunk,
  fetchMonthlyPortionsThunk,
  fetchDailyPortionsThunk,
} from './operations.js';

const initialState = {
  dailyNorma: null,
  monthlyPortions: [],

  dailyPortions: [],
  percentPerDay: null,

  dailyPortions: [2000],

  activeContent: 'pictureBottleBg',
  isLoading: false,
  isError: null,
  isOpenDailyNormaModal: false,
  isTodayModalOpen: false,
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
    openTodayModal: state => {
      state.isTodayModalOpen = true;
    },
    closeTodayModal: state => {
      state.isTodayModalOpen = false;
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
  openTodayModal,
  closeTodayModal,
} = waterSlice.actions;

export default waterSlice.reducer;
