import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovieInfo = createAsyncThunk(
  "movies/getMovieInfo",
  async ({
    imdbID,
    genre,
    rating,
    country,
  }: {
    imdbID: string;
    genre: string;
    rating: string;
    country: string;
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
      country,
    }: {
      title: string;
      year: string;
      genre: string;
      rating: string;
      country: string;
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
          getMovieInfo({ imdbID: movie.imdbID, genre, rating, country })
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

const meetsSearchCriteria = (movie, searchParams) => {
  return (
    (!searchParams.genre || movie.Genre.includes(searchParams.genre)) &&
    (!searchParams.minRating ||
      parseFloat(movie.imdbRating) >= parseFloat(searchParams.minRating)) &&
    (!searchParams.maxRating ||
      parseFloat(movie.imdbRating) <= parseFloat(searchParams.maxRating)) &&
    (!searchParams.country || movie.Country.includes(searchParams.country))
  );
};

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchMovies: [],
    searchByFilters: [],
    searchFull: [],
    status: "",
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
        const searchParams = action.meta.arg;

        // Проверка соответствия фильма критериям поиска
        const meetsCriteria = meetsSearchCriteria(movie, searchParams);

        // Проверка наличия фильма в результате поиска и его отсутствия в уже найденных фильмах
        if (
          meetsCriteria &&
          !state.searchFull.find((item) => item.imdbID === movie.imdbID)
        ) {
          state.searchFull.push(movie);
        }
        // const movie = action.payload;
        // const ratingRange = action.meta.arg.rating.split("-");
        // const minRating = parseFloat(ratingRange[0]);
        // const maxRating = parseFloat(ratingRange[1]);
        // const movieRating = parseFloat(movie.imdbRating);
        // if (
        //   ((action.meta.arg.genre === undefined ||
        //     action.meta.arg.genre === "") &&
        //     (minRating === NaN || movieRating >= minRating) &&
        //     (maxRating === NaN || movieRating <= maxRating)) ||
        //   (movie.Genre.includes(action.meta.arg.genre) &&
        //     movieRating >= minRating &&
        //     movieRating <= maxRating &&
        //     movie.Country.includes(action.meta.arg.country) &&
        //     !state.searchFull.find((item) => item.imdbID === movie.imdbID))
        // ) {
        //   state.searchFull.push(movie);
        // }
      });
  },
});

export const { clearSearchMovies, setSearchMovie, clearSearchFull } =
  searchSlice.actions;
export default searchSlice.reducer;
