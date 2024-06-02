import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteMovies: [],
  },
  reducers: {
    addFavoriteMovie(state, action) {
      console.log(action.payload);
      state.favoriteMovies.push(action.payload);
    },
  },
});

export const { addFavoriteMovie } = favoritesSlice.actions;
export default favoritesSlice.reducer;
