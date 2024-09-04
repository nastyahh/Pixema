import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoritesState, Movie } from "../utility/types";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteMovies: [],
  } as FavoritesState,
  reducers: {
    addFavoriteMovie(state, action: PayloadAction<Movie>) {
      console.log("Adding movie:", action.payload);
      const movieExists = state.favoriteMovies.some(
        (movie: Movie) => movie.imdbID === action.payload.imdbID
      );
      if (!movieExists) {
        state.favoriteMovies.push(action.payload);
      } else {
        console.log("Movie already exists:", action.payload);
      }
    },
  },
});

export const { addFavoriteMovie } = favoritesSlice.actions;
export default favoritesSlice.reducer;
