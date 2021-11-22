import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import filterReducer from "../slices/filterSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    filter: filterReducer,
  },

});
