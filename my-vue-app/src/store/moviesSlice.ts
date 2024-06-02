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
      console.log(data);
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
    movieInfo: {},
    status: null as null | "loading" | "fulfilled" | "rejected",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.movies = action.payload;
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        state.movieInfo = action.payload;
      });
  },
});

export default moviesSlice.reducer;
