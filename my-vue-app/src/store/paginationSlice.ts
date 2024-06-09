import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "pagination/fetchMovies",
  async (page) => {
    console.log(page);
    const responce = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&s=movie&page=${page}`
    );
    const data = await responce.json();
    // console.log(data);
    return data;
  }
);

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    movies: [],
    currentPage: 1,
    status: "",
  },
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

// export const { fetchMovies } = paginationSlice.actions;
export default paginationSlice.reducer;
