import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        "https://www.omdbapi.com/?apikey=2c09a177&s=movie"
      );
      if (!responce.ok) {
        throw new Error("Error fetching movies");
      }

      const data = await responce.json();
      return data.Search;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getMovieInfo = createAsyncThunk(
  "movies/getMovie",
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        `https://www.omdbapi.com/?apikey=2c09a177&i=${imdbID}&plot=full`
      );
      if (!responce.ok) {
        throw new Error("Error fetching movie information");
      }

      const data = await responce.json();
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    movieInfo: {} | Array<{}>,
    movieInfos: [],
    status: null as null | "loading" | "fulfilled" | "rejected",
  },
  reducers: {
    clearMovies(state) {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.movies = action.payload;
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        // state.movieInfo = action.payload;
        // state.movieInfos.push(action.payload);
        state.movieInfo = action.payload;
        const existingMovie = state.movieInfos.find(
          (movie) => movie.imdbID === action.payload.imdbID
        );
        if (!existingMovie) {
          state.movieInfos.push(action.payload);
        }
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
