// src/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./slices/authSlice";

// Configuration object for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Specify which slices you want to persist
};

const rootReducer = combineReducers({
  auth: authSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
