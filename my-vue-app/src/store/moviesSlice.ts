import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchRecommendedMovies = createAsyncThunk(
  "movies/fetchRecommendedMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://www.omdbapi.com/?apikey=2c09a177&s=batman"
      );
      if (!response.ok) {
        throw new Error("Error fetching movies");
      }
      const data = await response.json();
      const movies = data.Search;

      // Получаем подробную информацию для каждого фильма
      const movieDetails = await Promise.all(
        movies.map(async (movie) => {
          const detailsResponse = await fetch(
            `https://www.omdbapi.com/?apikey=2c09a177&i=${movie.imdbID}&plot=full`
          );
          if (!detailsResponse.ok) {
            throw new Error("Error fetching movie details");
          }
          return detailsResponse.json();
        })
      );

      // Фильтруем фильмы по рейтингу
      const recommendedMovies = movieDetails.filter(
        (movie) => parseFloat(movie.imdbRating) > 7.0
      );

      return recommendedMovies;
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
    recommendedMovies: [],
    recommendedMoviesStatus: null as
      | null
      | "loading"
      | "fulfilled"
      | "rejected",
    status: null as null | "loading" | "fulfilled" | "rejected",
    movieInfoStatus: null as null | "loading" | "fulfilled" | "rejected",
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
      .addCase(getMovieInfo.pending, (state) => {
        state.movieInfoStatus = "loading";
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        state.movieInfoStatus = "fulfilled";
        state.movieInfo = action.payload;
        const existingMovie = state.movieInfos.find(
          (movie) => movie.imdbID === action.payload.imdbID
        );
        if (!existingMovie) {
          state.movieInfos.push(action.payload);
        }
      })
      .addCase(fetchRecommendedMovies.pending, (state) => {
        state.recommendedMoviesStatus = "loading";
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
        state.recommendedMovies = action.payload;
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
