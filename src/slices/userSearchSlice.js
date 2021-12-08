import { createSlice } from "@reduxjs/toolkit";

const KEY = "userSearch";

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function mostRecurrent(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
}

const initialState = {
  categories: loadState() ? loadState() : [],
};


export async function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);

  } catch (e) {
    // Ignore
  }
}

export const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  
  reducers: {
    addToUserSearch: (state, action) => {
        state.categories = [...state.categories, action.payload];
      saveState(state.categories)
    },
  },
});

export const { addToUserSearch } = userSearchSlice.actions;

export const selectCategories = (state) =>
 mostRecurrent(state.userSearch.categories.slice(state.userSearch.categories.length - 10, state.userSearch.categories.length));

export default userSearchSlice.reducer;