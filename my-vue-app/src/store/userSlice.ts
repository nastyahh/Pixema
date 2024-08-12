import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { ActivateUser } from "../utility/types";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (
    {
      signUpObj,
      callback,
    }: {
      signUpObj: {
        username: string;
        email: string;
        password: string;
        course_group: number;
      };
      callback: () => void;
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
      callback();
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

      localStorage.setItem("Login", JSON.stringify(data));
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
      const { access } = JSON.parse(localStorage.getItem("Login") as string);

      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/me/",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + access,
            "Content-Type": "application/json",
          },
        }
      );
      if (responce.status === 401) {
        dispatch(refreshToken());
      }

      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const userActivate = createAsyncThunk(
  "user/userActivate",
  async (activateObj: ActivateUser, { rejectWithValue }) => {
    try {
      const activateData = {
        uid: activateObj.uid,
        token: activateObj.token,
      };
      console.log(activateData);
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/activation/",
        {
          method: "POST",
          body: JSON.stringify(activateData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!responce.ok) {
        throw new Error("Error :(");
      }
      const data = await responce.json();
      console.log(data);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { refresh } = JSON.parse(localStorage.getItem("Login") as string);
      console.log("Read Refresh Token:", refresh);
      const responce = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refresh }),
        }
      );
      const data = await responce.json();

      localStorage.setItem(
        "Login",
        JSON.stringify({ refresh: refresh, access: data.access })
      );
      dispatch(getUserProfile());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/users/reset_password/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        }
      );
      if (!response.ok) {
        throw new Error("Error :(");
      }

      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "user/resetPassword",
  async ({ uid, token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://studapi.teachmeskills.by/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: uid,
            token: token,
            new_password: newPassword,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error :(");
      }

      return response;
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
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLogged = false;
      });
  },
});

export const { addUser, toggleIsLogged } = userSlice.actions;
export default userSlice.reducer;
