import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (str: string) => {
    const responce = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&s=${str}`
    );
    if (!responce.ok) {
      throw new Error("Error find movies");
    }
    const data = await responce.json();

    return data.Search;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchMovies: [],
    status: "",
  },
  reducers: {
    setSearchMovie: (state, action) => {
      state.searchMovies = action.payload;
    },
    clearSearchMovies: (state) => {
      state.searchMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.searchMovies = action.payload;
    });
  },
});

export const { clearSearchMovies, setSearchMovie } = searchSlice.actions;
export default searchSlice.reducer;
