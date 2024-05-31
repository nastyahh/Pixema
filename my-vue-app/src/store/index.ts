import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
  },
});
