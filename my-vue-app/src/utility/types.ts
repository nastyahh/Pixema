export interface IActiveContext {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface IChildren {
  children: React.ReactNode[] | React.ReactNode;
}

export interface IUser {
  username: string;
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
  };
}
