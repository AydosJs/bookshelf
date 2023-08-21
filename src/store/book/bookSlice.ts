import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book, BookWithStatus } from "../../types/common";
import { RootState } from "../store";

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
    addBooksToMyBooks: (state, action: PayloadAction<BookWithStatus[]>) => {
      state.myBooks = action.payload;
    },
    checkShelf: (state, action: PayloadAction<Book>) => {
      if (
        state.myBooks?.findIndex(
          (item) => item?.book?.id === action?.payload?.id
        ) === -1
      ) {
        state.myBooks.push({
          book: action?.payload,
          status: 0,
        });
      }
    },
    searchedBooksList: (
      state,
      action: PayloadAction<Omit<Book, "id" | "pages">[]>
    ) => {
      state.searchedBooks = action.payload;
      console.log(state);
    },
  },
});

export const { addBooksToMyBooks, searchedBooksList, checkShelf } =
  bookSlice.actions;
export const getMyBooks = (state: RootState) => state.books.myBooks;
export const getSearchedBooks = (state: RootState) => state.books.searchedBooks;
export default bookSlice.reducer;
