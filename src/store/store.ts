import { configureStore } from "@reduxjs/toolkit";
import searchBookReducer from "./book/searchSlice";
import books from "./book/bookSlice";

export const store = configureStore({
  reducer: {
    searchBooks: searchBookReducer,
    books: books,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
