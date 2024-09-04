import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesResponse, PaginationState } from "../utility/types";

export const fetchMovies = createAsyncThunk<MoviesResponse, number>(
  "pagination/fetchMovies",
  async (page: number) => {
    console.log(page);
    const responce = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&s=batman&page=${page}`
    );
    const data = await responce.json();
    return data;
  }
);

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    movies: [],
    currentPage: 1,
    status: "",
  } as PaginationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.movies = [...state.movies, ...action.payload.Search];
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default paginationSlice.reducer;
