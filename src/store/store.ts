import { configureStore } from "@reduxjs/toolkit";
import searchBookReducer from "./book/SearchSlice";

export const store = configureStore({
  reducer: {
    searchBooks: searchBookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
