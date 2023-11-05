// toggleSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SettingsType = {
  mode: "light" | "dark";
};

const initialState: SettingsType = {
  mode: "dark",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleMode(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
  },
});

// export the action creator
export const { toggleMode } = settingsSlice.actions;

// export the reducer
export default settingsSlice.reducer;
