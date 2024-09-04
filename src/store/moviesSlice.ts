import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie, MovieInfo, MoviesState } from "../utility/types";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        "https://www.omdbapi.com/?apikey=2c09a177&s=batman"
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

export const getTrends = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>("movies/getTrends", async (_, { rejectWithValue, dispatch }) => {
  let trends: Movie[] = [];
  let page = 1;

  try {
    while (trends.length < 10) {
      const responce = await fetch(
        `https://www.omdbapi.com/?apikey=2c09a177&s=batman&page=${page}`
      );
      if (!responce.ok) {
        throw new Error("Error fetching movies");
      }

      const data = await responce.json();
      const movies = data.Search;

      const movieDetails = await Promise.all(
        movies.map(async (movie: { imdbID: string }) => {
          const detailsAction = await dispatch(getMovieInfo(movie.imdbID));
          if (getMovieInfo.rejected.match(detailsAction)) {
            throw new Error(detailsAction.payload as string);
          }
          return detailsAction.payload;
        })
      );

      const trendingMovies = movieDetails.filter(
        (movie) => parseFloat(movie.imdbRating) > 8.0
      );
      trends = trends.concat(trendingMovies);
      page += 1;

      if (!data.Search || data.Search.length === 0) {
        break;
      }
    }

    return trends.slice(0, 10);
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const fetchRecommendedMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>("movies/fetchRecommendedMovies", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://www.omdbapi.com/?apikey=2c09a177&s=batman"
    );
    if (!response.ok) {
      throw new Error("Error fetching movies");
    }
    const data = await response.json();
    const movies = data.Search;

    const movieDetails = await Promise.all(
      movies.map(async (movie: { imdbID: string }) => {
        const detailsResponse = await fetch(
          `https://www.omdbapi.com/?apikey=2c09a177&i=${movie.imdbID}&plot=full`
        );
        if (!detailsResponse.ok) {
          throw new Error("Error fetching movie details");
        }
        return detailsResponse.json();
      })
    );

    const recommendedMovies = movieDetails.filter(
      (movie) => parseFloat(movie.imdbRating) > 7.0
    );

    return recommendedMovies;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const getMovieInfo = createAsyncThunk<
  MovieInfo,
  string,
  { rejectValue: string }
>("movies/getMovie", async (imdbID: string, { rejectWithValue }) => {
  try {
    const responce = await fetch(
      `https://www.omdbapi.com/?apikey=2c09a177&i=${imdbID}&plot=full`
    );
    if (!responce.ok) {
      throw new Error("Error fetching movie information");
    }
    const data = await responce.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    trends: [],
    movieInfo: {} as MovieInfo,
    movieInfos: [],
    recommendedMovies: [],
    recommendedMoviesStatus: null as
      | null
      | "loading"
      | "fulfilled"
      | "rejected",
    status: null as null | "loading" | "fulfilled" | "rejected",
    movieInfoStatus: null as null | "loading" | "fulfilled" | "rejected",
    trendsStatus: null as null | "loading" | "fulfilled" | "rejected",
  } as MoviesState,
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
      .addCase(getMovieInfo.pending, (state) => {
        state.movieInfoStatus = "loading";
      })
      .addCase(
        getMovieInfo.fulfilled,
        (state, action: PayloadAction<MovieInfo>) => {
          state.movieInfoStatus = "fulfilled";
          state.movieInfo = action.payload;
          const existingMovie = state.movieInfos.find(
            (movie: { imdbID: string }) =>
              movie.imdbID === action.payload.imdbID
          );
          if (!existingMovie) {
            state.movieInfos.push(action.payload);
          }
        }
      )
      .addCase(fetchRecommendedMovies.pending, (state) => {
        state.recommendedMoviesStatus = "loading";
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
        state.recommendedMovies = action.payload;
      })
      .addCase(getTrends.pending, (state) => {
        state.trendsStatus = "loading";
      })
      .addCase(getTrends.fulfilled, (state, action) => {
        state.trends = action.payload;
        state.trendsStatus = "fulfilled";
      })
      .addCase(getTrends.rejected, (state) => {
        state.trendsStatus = "rejected";
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
