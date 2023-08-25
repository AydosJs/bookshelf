import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/common";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import * as authApi from "../../api/authApi";
import { RootState } from "../store";
import { AxiosError } from "axios";

type Auth = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
};

const initialState: Auth = {
  isLoggedIn: Boolean(Cookies.get("key")) || false,
  user: null,
  isLoading: false,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: Omit<User, "id">) => {
    try {
      const res = await authApi.register(data);
      toast.success("Account created successfully");
      return res;
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
      return err;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      Cookies.remove("key");
      Cookies.remove("Secret");
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [createUser.pending.toString()]: (state: Auth) => {
      state.isLoading = true;
    },
    [createUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<Omit<User, "id">>
    ) => {
      state.isLoading = false;
      state.isLoggedIn = true;

      Cookies.set("key", action.payload.key);
      Cookies.set("Secret", action.payload.secret);
      state.user = action.payload;
    },
    [createUser.rejected.toString()]: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
});

export const { logOut } = authSlice.actions;
export const getmyInfo = (state: RootState) => state.auth.user;
export default authSlice.reducer;
