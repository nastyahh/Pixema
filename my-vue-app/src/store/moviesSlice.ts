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

      const data = responce.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    status: null as null | "loading" | "fulfilled" | "rejected",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.status = "loading";
      state.movies = action.payload;
    });
  },
});

export default moviesSlice.reducer;
