import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async ({
    imdbID,
    genres,
    rating,
    country,
  }: {
    imdbID: string;
    genres?: string[];
    rating?: string;
    country?: string;
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
      genres,
      rating,
      country,
    }: {
      title: string;
      year: string;
      genres?: string[];
      rating?: string;
      country?: string;
    },
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
          getMovieInfo({ imdbID: movie.imdbID, genres, rating, country })
        );
        return infoResponse.payload;
      })
    );

    return movies;
  }
);

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (str: string, { dispatch }) => {
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
    searchFullStatus: null as null | "loading" | "fulfilled" | "rejected",
    searchFull: [],
    status: "",
    error: null,
    filtersIsApplied: false,
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
        // state.searchMovies.map((movie)=>{})
      })
      .addCase(searchByFilters.pending, (state) => {
        state.searchFull = [];
      })
      .addCase(searchByFilters.fulfilled, (state, action) => {
        state.searchByFilters = action.payload;
        state.filtersIsApplied = true;
      })
      .addCase(getMovieInfo.pending, (state) => {
        state.searchFullStatus = "loading";
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        state.searchFullStatus = "fulfilled";
        const movie = action.payload;
        const ratingRange = action.meta.arg.rating.split("-");
        const minRating = parseFloat(ratingRange[0]);
        const maxRating = parseFloat(ratingRange[1]);
        const movieRating = parseFloat(movie.imdbRating);

        const matchesGenres =
          !action.meta.arg.genres.length ||
          action.meta.arg.genres.every((genre) => movie.Genre.includes(genre));

        const matchesRating =
          (isNaN(minRating) && isNaN(maxRating)) ||
          ratingRange.length === 1 ||
          (!isNaN(minRating) &&
            movieRating >= minRating &&
            !isNaN(maxRating) &&
            movieRating <= maxRating);

        const matchesCountry =
          !action.meta.arg.country ||
          movie.Country.includes(action.meta.arg.country);

        if (
          matchesGenres &&
          matchesRating &&
          matchesCountry &&
          !state.searchFull.find((item) => item.imdbID === movie.imdbID)
        ) {
          state.searchFull.push(movie);
        }
      });
  },
});

export const { clearSearchMovies, setSearchMovie, clearSearchFull } =
  searchSlice.actions;
export default searchSlice.reducer;
