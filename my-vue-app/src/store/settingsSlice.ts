import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setPassword = createAsyncThunk(
  "settings/setPassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("Login")).access;

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
      return rejectWithValue(error.message);
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
