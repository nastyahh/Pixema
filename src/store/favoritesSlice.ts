import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteMovies: [],
  },
  reducers: {
    addFavoriteMovie(state, action) {
      console.log("Adding movie:", action.payload);
      const movieExists = state.favoriteMovies.some(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (!movieExists) {
        state.favoriteMovies.push(action.payload);
        console.log("Movie added:", action.payload);
        console.log(state.favoriteMovies);
      } else {
        console.log("Movie already exists:", action.payload);
      }
    },
  },
});

export const { addFavoriteMovie } = favoritesSlice.actions;
export default favoritesSlice.reducer;
