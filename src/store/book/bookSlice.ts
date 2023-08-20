import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookWithStatus } from "../../types/common";
import { RootState } from "../store";

const initialState: BookWithStatus[] = [];

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooksToShelf: (state, action: PayloadAction<BookWithStatus[]>) => {
      state.splice(0, state.length);
      state.push(...action.payload);
    },
  },
});

export const { addBooksToShelf } = bookSlice.actions;
export const bookSelector = (state: RootState) => state.books;
export default bookSlice.reducer;
