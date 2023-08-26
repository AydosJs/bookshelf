import { configureStore } from "@reduxjs/toolkit";
import books from "./bookSlice";
import auth from "./auth";
import settings from "./settings";

export const store = configureStore({
  reducer: {
    books,
    auth,
    settings,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
