// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clientconfig } from "../../../clientconfig";
const { url } = clientconfig;
// Define an initial state
const initialState = {
  products: [],
  status: "idle",
  error: null,
};

// Define an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (category) => {
    const host = `${url}`;
    const response = await axios.get(`${host}/products/category/${category}`);
    const dataWithQuantity = response.data.map((data) => {
      return {
        ...data,
        quantity: 1,
      };
    });
    return dataWithQuantity;
  }
);

// Create a product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
