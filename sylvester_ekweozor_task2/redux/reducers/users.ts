import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";

import { ActionProps, InitialState } from "../../types";
import type { RootState } from "../index";

const initialState: InitialState = {
  loading: false,
  error: "",
  data: null,
};

export const userAction = createAsyncThunk(
  "user/userAction",
  async function ({ path, method, payload }: ActionProps) {
    try {
      const config: AxiosRequestConfig = {
          baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
          url: path,
          method,
          data: payload,
        },
        response = await axios(config);
      return response.data;
    } catch (error) {
      // @ts-ignore
      return error?.message;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(userAction.pending, (state, action) => {
        state.loading = true;
        state.error = "";
        state.data = null;
      })
      .addCase(userAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(userAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
        state.data = null;
      }),
});

export const userSelector = (state: RootState) => state.users;

export default userSlice.reducer;
