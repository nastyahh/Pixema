import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SetPassword } from "../utility/types";

export const setPassword = createAsyncThunk(
  "settings/setPassword",
  async (
    { currentPassword, newPassword }: SetPassword,
    { rejectWithValue }
  ) => {
    try {
      const loginItem = localStorage.getItem("Login");
      if (!loginItem) {
        throw new Error("Login information is missing");
      }
      const { access: token } = JSON.parse(loginItem);

      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/users/set_password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            new_password: newPassword,
            current_password: currentPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setPassword.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default settingsSlice.reducer;
