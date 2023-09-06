import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create a thunk action to check if the user is logged in
export const addToCartWithCheck = createAsyncThunk(
  "cart/addToCartWithCheck",
  async (product, { getState, dispatch }) => {
    // Check if the user is logged in (you may need to adjust this based on your user state structure)
    const { user } = getState();
    if (!user.user) {
      // Redirect the user to the login page (replace '/login' with your login route)
      window.location.href = "/login";
      return;
    }

    // If the user is logged in, dispatch the addToCart action
    dispatch(addToCart(product));
  }
);

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
      let find = state.cart.findIndex((c) => c._id === action.payload._id);
      state.cart[find].quantity--;
      if (state.cart[find].quantity == 0) {
        state.cart.splice(find, 1);
      }
      state.totalQuantity--;
      state.totalPrice -= action.payload.price;
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
