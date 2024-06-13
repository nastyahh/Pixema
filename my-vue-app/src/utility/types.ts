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
