import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import favoritesSlice from "./favoritesSlice";
import paginationSlice from "./paginationSlice";
import searchSlice from "./searchSlice";
import settingsSlice from "./settingsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
    favorites: favoritesSlice,
    pagination: paginationSlice,
    search: searchSlice,
    settings: settingsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
