import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (
    signUpObj: {
      username: string;
      email: string;
      password: string;
      course_group: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/",
        {
          method: "POST",
          body: JSON.stringify(signUpObj),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken":
              "2u9EiabuRdAvpzVVsb1AyBCN4NHiCd5Ea3MCV5Pzj5kaopDjEW0Dqhmb3jXgmn3p",
          },
        }
      );
      if (!responce.ok) {
        throw new Error("Error :(");
      }
      const data = await responce.json();
      dispatch(addUser(data));
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (
    userObj: {
      email: string;
      password: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/create/",
        {
          method: "POST",
          body: JSON.stringify(userObj),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken":
              "2u9EiabuRdAvpzVVsb1AyBCN4NHiCd5Ea3MCV5Pzj5kaopDjEW0Dqhmb3jXgmn3p",
          },
        }
      );
      if (!responce.ok) {
        throw new Error("Error :(");
      }
      const data = await responce.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      console.log(token);
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/me/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!responce.ok) {
        throw new Error("Error fetching user profile");
      }
      const data = await responce.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const userActivate = createAsyncThunk(
  "user/userActivate",
  async (
    activateObj: {
      uid: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/activation/",
        {
          method: "POST",
          body: JSON.stringify(activateObj),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken":
              "2u9EiabuRdAvpzVVsb1AyBCN4NHiCd5Ea3MCV5Pzj5kaopDjEW0Dqhmb3jXgmn3p",
          },
        }
      );
      if (!responce.ok) {
        throw new Error("Error :(");
      }
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    profile: null,
    status: null as null | "loading" | "fulfilled" | "rejected",
    error: null as null | string,
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
