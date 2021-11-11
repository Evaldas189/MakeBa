import { createSlice } from "@reduxjs/toolkit";

const KEY = "redux";

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

const initialState = {
  items: loadState() ? loadState() : [],
};


export async function saveState(state) {
  console.log("LOOL")
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);

  } catch (e) {
    // Ignore
  }
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  
  reducers: {
    
    addToBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      if (index < 0) {
        state.items = [...state.items, action.payload];
      } else {
        let newBasket = [...state.items];
        newBasket[index].quantity += 1;
        state.items = newBasket;
      }
      saveState(state.items)
    },
    updateBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket[index].quantity = action.payload.number;
      } else {
        console.warn("can't update");
      }
      state.items = newBasket;
      saveState(state.items)
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("can't remove");
      }
      state.items = newBasket;
      saveState(state.items)
      console.log(state.items)
    },
  },
});

export const { addToBasket, removeFromCart, updateBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items?.reduce((total, item) => total + (item.price * item.quantity), 0);

export default basketSlice.reducer;
