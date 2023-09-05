import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((c) => c._id === action.payload._id);
      if (find >= 0) {
        state.cart[find].quantity++;
      } else {
        state.cart.push(action.payload);
      }
      state.totalQuantity++;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      let find = state.cart.findIndex((c) => c.id === action.payload.id);
      state.cart[find].quantity--;
      if (state.cart[find].quantity == 0) {
        state.cart.splice(find, 1);
      }
      state.totalQuantity--;
      state.totalPrice -= action.payload.price;
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
