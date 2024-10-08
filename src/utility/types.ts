export interface IActiveContext {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChildren {
  children: React.ReactNode[] | React.ReactNode;
}
export interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface IBurgerMenuContext {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export interface IChildren {
  children: React.ReactNode[] | React.ReactNode;
}

export interface IUser {
  username: string;
}

export interface IMenu {
  className?: string;
}

export interface IPasswordInput {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
}

export interface IAuthContext {
  isAuth: User;
  signin: (auth: User, callBack: () => void) => void;
  signout: (callBack: () => void) => void;
}

export interface User {
  email: string;
  password: string;
}
export interface ActivateUser {
  uid: string;
  token: string;
}
export interface SearchQuery {
  title: string;
  year: string;
  genre: string;
  rating?: string;
  minRating: string;
  maxRating: string;
  country: string;
}
export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
}
export interface FavoritesState {
  favoriteMovies: Movie[];
}

export interface MoviesState {
  movies: Movie[];
  trends: Movie[];
  movieInfo: MovieInfo | null;
  movieInfos: MovieInfo[];
  recommendedMovies: Movie[];
  recommendedMoviesStatus: "loading" | "fulfilled" | "rejected" | null;
  status: "loading" | "fulfilled" | "rejected" | null;
  movieInfoStatus: "loading" | "fulfilled" | "rejected" | null;
  trendsStatus: "loading" | "fulfilled" | "rejected" | null;
}

export interface PaginationState {
  movies: Movie[];
  currentPage: number;
  status: "idle" | "loading" | "fulfilled" | "rejected" | "";
}

export interface SearchState {
  query: string;
  searchMovies: Movie[];
  searchByFilters: Movie[];
  searchFullStatus: null | "loading" | "fulfilled" | "rejected";
  searchFull: Movie[];
  status: "idle" | "loading" | "fulfilled" | "rejected";
  error: string | null;
  filtersIsApplied: boolean;
}

export interface MoviesResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
export interface FilteredMoviesProps {
  data: Movie[];
}
export interface MovieInfo {
  imdbID: string;
  Title: string;
  Poster: string;
  Genre: string;
  imdbRating: string;
  Runtime: string;
  Plot: string;
  Year: string;
  Released: string;
  BoxOffice: string;
  Country: string;
  Production: string;
  Actors: string;
  Director: string;
  Writer: string;
}
export interface MoviesProps {
  data: MovieInfo[];
  movieInfos: MovieInfo[];
}
export interface filterInitialState {
  title: string;
  year: string;
  genres: string[];
  minRating: string;
  maxRating: string;
  country: string[];
}
export interface selectedOptions {
  label: string;
  value: string;
}

export type OptionType = {
  value: string;
  label: string;
};

export interface ResetPasswordConfirm {
  uid: string;
  token: string;
  newPassword: string;
}

export interface SetPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
export interface State {
  user: {
    isLogged: boolean;
    profile: {
      id: number;
      username: string;
      email: string;
    } | null;
  };
  movies: {
    movies: [];
    movieInfo: MovieInfo | null;
    movieInfos: [];
    status: string | null;
    movieInfoStatus: string | null;
    trendsStatus: string | null;
    trends: [];
    recommendedMovies: MovieInfo[];
  };
  pagination: {
    movies: [];
    currentPage: number;
    status: string | null;
  };
  search: {
    searchMovies: [];
    searchByFilters: [];
    searchFull: [];
    status: string;
    searchFullStatus: string | null;
    filtersIsApplied: boolean;
    query?: string;
  };
  navbar: {
    isLogged: boolean;
  };
  favorites: {
    favoriteMovies: MovieInfo[];
  };
}
