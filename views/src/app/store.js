import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web and AsyncStorage for mobile
import cartReducer from "../features/cartSlice";
import { combineReducers } from "redux"; // Import combineReducers
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["allCart", "user"], // Specify the reducers to persist
};
const rootReducer = combineReducers({
  allCart: cartReducer,
  products: productReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
