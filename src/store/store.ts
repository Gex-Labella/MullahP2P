import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice";

export const store = configureStore({
  reducer: {
    chart: chartReducer, // ✅ register slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
