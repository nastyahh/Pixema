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

      localStorage.setItem("access_token", JSON.stringify(data.access));
      localStorage.setItem("refresh_token", JSON.stringify(data.refresh));
      dispatch(toggleIsLogged(true));
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token") as string);
      console.log(token);
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/me/",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (responce.status === 401) {
        dispatch(refreshToken());
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

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = localStorage.getItem("refresh__token") as string;
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refresh }),
        }
      );
      const data = await responce.json();
      console.log(data);
      const accessToken = data.access;
      localStorage.setItem("access_token", accessToken);
      return accessToken;
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
    isLogged: false,
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
    toggleIsLogged(state, action) {
      state.isLogged = action.payload;
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

export const { addUser, toggleIsLogged } = userSlice.actions;
export default userSlice.reducer;
