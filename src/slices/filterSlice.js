import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    keyword: "",
    minValue: "",
    maxValue: "",
    sort: "",
  },
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    
    applyFilter: (state, action) => {
     
      state.filter[action.payload.key] = action.payload.value;
    },
    resetFilter: (state) => {
       state.filter = {
        keyword: "",
        minValue: "",
        maxValue: "",
        sort: "",
      }
    },
  },
});

export const { applyFilter, resetFilter } = filterSlice.actions;

export const selectFilter = (state) => state.filter.filter;

export default filterSlice.reducer;