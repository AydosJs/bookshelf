import { configureStore } from "@reduxjs/toolkit";
import books from "./book/bookSlice";
import auth from "./auth/auth";

export const store = configureStore({
  reducer: {
    books,
    auth,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
