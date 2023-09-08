import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
    removeFromProducts: (state, action) => {
      let find = state.products.findIndex((c) => c._id === action.payload._id);
      if (find >= 0) {
        state.cart.splice(find, 1);
      }
    },
    removeFromUsers: (state, action) => {
      let find = state.users.findIndex((c) => c._id === action.payload._id);
      if (find >= 0) {
        state.cart.splice(find, 1);
      }
    },
  },
});

export const {
  setAllProducts,
  setAllUsers,
  removeFromProducts,
  removeFromUsers,
} = adminSlice.actions;
export default adminSlice.reducer;
