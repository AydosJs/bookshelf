import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types/common";
import { RootState } from "../store";

const initialState: Omit<Book, "id" | "pages">[] = [];

export const searchSlice = createSlice({
  name: "searchBooks",
  initialState,
  reducers: {
    searchedBooksList: (
      state,
      action: PayloadAction<Omit<Book, "id" | "pages">[]>
    ) => {
      state.splice(0, state.length);
      state.push(...action.payload);
      console.log(state);
    },
  },
});

export const { searchedBooksList } = searchSlice.actions;
export const searchBookSelector = (state: RootState) => state.searchBooks;
export default searchSlice.reducer;
