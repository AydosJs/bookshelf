import { configureStore } from "@reduxjs/toolkit";
import books from "./book/bookSlice";

export const store = configureStore({
  reducer: {
    books,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
