import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import filterReducer from "../slices/filterSlice";
import userSearchReducer from "../slices/userSearchSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    filter: filterReducer,
    userSearch: userSearchReducer,
  },

});
