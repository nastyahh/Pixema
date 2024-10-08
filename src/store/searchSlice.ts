import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie, MovieInfo, SearchState } from "../utility/types";

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async ({
    imdbID,
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

// export const searchByFilters = createAsyncThunk(
//   "search/searchByFilters",
//   async (
//     {
//       title,
//       year,
//       genres,
//       rating,
//       country,
//     }: {
//       title: string;
//       year: string;
//       genres?: string[];
//       rating?: string;
//       country?: string[];
//     },
//     { rejectWithValue, dispatch }
//   ) => {
//     const responce = await fetch(
//       `https://www.omdbapi.com/?apikey=2c09a177&s=${title}&y=${year}`
//     );
//     if (!responce.ok) {
//       throw new Error("Error find movies");
//     }
//     const data = await responce.json();
//     if (data.Response === "False") {
//       return rejectWithValue(data.Error);
//     }
//     const movies = data.Search;
//     dispatch(clearSearchFull());

//     await Promise.all(
//       movies.map(async (movie) => {
//         const infoResponse = await dispatch(
//           getMovieInfo({ imdbID: movie.imdbID, genres, rating, country })
//         );
//         return infoResponse.payload;
//       })
//     );

//     return movies;
//   }
// );
export const searchByFilters = createAsyncThunk<
  Movie[],
  {
    title: string;
    year: string;
    genres?: string[];
    rating?: string;
    country?: string[];
  }
>(
  "search/searchByFilters",
  async (
    { title, year, genres = [], rating, country = [] },
    { rejectWithValue, dispatch }
  ) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&s=${title}&y=${year}`
    );
    if (!response.ok) {
      throw new Error("Error finding movies");
    }
    const data = await response.json();
    if (data.Response === "False") {
      return rejectWithValue(data.Error);
    }
    const movies = data.Search;
    dispatch(clearSearchFull());

    await Promise.all(
      movies.map(async (movie: MovieInfo) => {
        const infoResponse = await dispatch(
          getMovieInfo({
            imdbID: movie.imdbID,
            genres,
            rating,
            country: country[0],
          })
        );
        return infoResponse.payload;
      })
    );

    return movies;
  }
);

// export const searchMovies = createAsyncThunk(
//   "search/searchMovies",
//   async (str: string) => {
//     const responce = await fetch(
//       `https://www.omdbapi.com/?apikey=2c09a177&s=${str}`
//     );
//     if (!responce.ok) {
//       throw new Error("Error find movies");
//     }
//     const data = await responce.json();

//     return data.Search;
//   }
// );
export const searchMovies = createAsyncThunk<Movie[], string>(
  "search/searchMovies",
  async (str) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&s=${str}`
    );
    if (!response.ok) {
      throw new Error("Error finding movies");
    }
    const data = await response.json();
    return data.Search;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    searchMovies: [] as Movie[],
    searchByFilters: [] as Movie[],
    searchFullStatus: null as null | "loading" | "fulfilled" | "rejected",
    searchFull: [] as Movie[],
    status: "idle",
    error: null as string | null,
    filtersIsApplied: false,
  } as SearchState,
  reducers: {
    updateSearchQuery(state, action) {
      state.query = action.payload;
    },
    setSearchMovie: (state, action) => {
      state.searchMovies = action.payload;
    },
    clearSearchMovies: (state) => {
      state.searchMovies = [];
      state.query = "";
    },
    clearSearchFull: (state) => {
      state.searchFull = [];
    },
    clearFilters: (state) => {
      state.filtersIsApplied = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.searchMovies = action.payload;
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
        // const ratingRange = action.meta.arg.rating.split("-");
        const ratingRange = action.meta.arg.rating
          ? action.meta.arg.rating.split("-")
          : [];
        const minRating = parseFloat(ratingRange[0]);
        const maxRating = parseFloat(ratingRange[1]);
        const movieRating = parseFloat(movie.imdbRating);

        const matchesGenres =
          !action.meta.arg.genres ||
          action.meta.arg.genres.length === 0 ||
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

export const {
  clearSearchMovies,
  setSearchMovie,
  clearSearchFull,
  updateSearchQuery,
  clearFilters,
} = searchSlice.actions;
export default searchSlice.reducer;
