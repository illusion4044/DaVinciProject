import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        text: '',
    },
    reducers: {
        changeFilter: (state, action) => {
            state.text = action.payload;
        }
    }
});

export const { changeFilter } = filtersSlice.actions;
export const selectTextFilter = (state) => state.filters.text;

export default filtersSlice.reducer;
