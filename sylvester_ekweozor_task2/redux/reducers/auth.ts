import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";

import { ActionProps, InitialState } from "../../types";
import type { RootState } from "../index";

const initialState: InitialState = {
  loading: false,
  error: "",
  data: null,
};

export const authAction = createAsyncThunk(
  "auth/authAction",
  async function ({ path, method, payload }: ActionProps) {
    try {
      const config: AxiosRequestConfig = {
          baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
          url: path,
          method,
          data: payload,
          headers: {
            Authorization: "Bearer " + payload?.token,
            "Content-Type": "application/json",
          },
        },
        response = await axios(config);

      if (path === "/login") {
        //persist data
        if (Boolean(response.data?.data)) {
          const jsonValue = JSON.stringify(response.data);
          await AsyncStorage.setItem("@user", jsonValue);
        }
      }

      return response.data;
    } catch (error) {
      // @ts-ignore
      return error?.message;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(authAction.pending, (state, action) => {
        state.loading = true;
        state.error = "";
        state.data = null;
      })
      .addCase(authAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.data = action.payload;
      })
      .addCase(authAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
        state.data = null;
      }),
});

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
