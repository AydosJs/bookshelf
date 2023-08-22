import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book, BookWithStatus } from "../../types/common";
import { RootState } from "../store";
import { some } from "lodash";

type BookState = {
  myBooks: BookWithStatus[];
  searchedBooks: Omit<Book, "id" | "pages">[];
};

const initialState: BookState = {
  myBooks: [],
  searchedBooks: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setMyBooks: (
      state,
      action: PayloadAction<BookWithStatus[] | undefined>
    ) => {
      state.myBooks = action.payload || [];
    },
    addToMyBooks: (state, action: PayloadAction<Book>) => {
      const hasItem = some(
        state.myBooks,
        (item) => item.book.id === action.payload.id
      );
      if (!hasItem) {
        state.myBooks.push({
          book: action.payload,
          status: 0,
        });
      }
    },
    setSearchedBooks: (
      state,
      action: PayloadAction<Omit<Book, "id" | "pages">[]>
    ) => {
      state.searchedBooks = action.payload || [];
    },
  },
});

export const { setMyBooks, setSearchedBooks, addToMyBooks } = bookSlice.actions;
export const getMyBooks = (state: RootState) => state.books.myBooks;
export const getSearchedBooks = (state: RootState) => state.books.searchedBooks;
export default bookSlice.reducer;
