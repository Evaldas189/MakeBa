import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      console.log(index)
      if (index < 0) {
        state.items = [...state.items, action.payload];
      } else {
        let newBasket = [...state.items];
        newBasket[index].quantity += 1;
        state.items = newBasket;

      }
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
    },
  },
});

export const { addToBasket, removeFromCart, updateBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default basketSlice.reducer;
