import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async ({
    imdbID,
    genre,
    rating,
  }: {
    imdbID: string;
    genre: string;
    rating: string;
  }) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&i=${imdbID}`
    );
    if (!response.ok) {
      throw new Error("Error fetching movie info");
    }
    const data = await response.json();

    return data;
  }
);

export const searchByFilters = createAsyncThunk(
  "search/searchByFilters",
  async (
    {
      title,
      year,
      genre,
      rating,
    }: { title: string; year: string; genre: string; rating: string },
    { rejectWithValue, dispatch }
  ) => {
    const responce = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&s=${title}&y=${year}`
    );
    if (!responce.ok) {
      throw new Error("Error find movies");
    }
    const data = await responce.json();
    if (data.Response === "False") {
      return rejectWithValue(data.Error);
    }
    const movies = data.Search;
    dispatch(clearSearchFull());

    await Promise.all(
      movies.map(async (movie) => {
        const infoResponse = await dispatch(
          getMovieInfo({ imdbID: movie.imdbID, genre, rating })
        );
        return infoResponse.payload;
      })
    );

    return movies;
  }
);

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
    searchByFilters: [],
    searchFull: [],
    status: "",
    error: null,
  },
  reducers: {
    setSearchMovie: (state, action) => {
      state.searchMovies = action.payload;
    },
    clearSearchMovies: (state) => {
      state.searchMovies = [];
    },
    clearSearchFull: (state) => {
      state.searchFull = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.searchMovies = action.payload;
      })
      .addCase(searchByFilters.fulfilled, (state, action) => {
        state.searchByFilters = action.payload;
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        const movie = action.payload;
        const ratingRange = action.meta.arg.rating.split("-");
        const minRating = parseFloat(ratingRange[0]);
        const maxRating = parseFloat(ratingRange[1]);
        const movieRating = parseFloat(movie.imdbRating);
        if (
          ((action.meta.arg.genre === undefined ||
            action.meta.arg.genre === "") &&
            (minRating === NaN || movieRating >= minRating) &&
            (maxRating === NaN || movieRating <= maxRating)) ||
          (movie.Genre.includes(action.meta.arg.genre) &&
            movieRating >= minRating &&
            movieRating <= maxRating &&
            !state.searchFull.find((item) => item.imdbID === movie.imdbID))
        ) {
          state.searchFull.push(movie);
        }
      });
  },
});

export const { clearSearchMovies, setSearchMovie, clearSearchFull } =
  searchSlice.actions;
export default searchSlice.reducer;
