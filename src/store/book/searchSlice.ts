import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types/common";
import { RootState } from "../store";

const initialState: Omit<Book, "id" | "pages">[] = [];

export const searchSlice = createSlice({
  name: "searchBooks",
  initialState,
  reducers: {
    addBooks: (state, action: PayloadAction<Omit<Book, "id" | "pages">>) => {
      state.push(action.payload);
    },
  },
});

export const { addBooks } = searchSlice.actions;
export const searchBookSelector = (state: RootState) => state.searchBooks;
export default searchSlice.reducer;
