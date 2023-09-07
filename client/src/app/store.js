import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import cartReducer from "../features/cartSlice";
import { combineReducers } from "redux";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["allCart", "user"],
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
