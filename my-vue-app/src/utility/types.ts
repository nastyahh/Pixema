export interface IActiveContext {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChildren {
  children: React.ReactNode[] | React.ReactNode;
}

export interface IUser {
  username: string;
}

export interface IAuthContext {
  isAuth: string;
  signin: (
    data: { email: string; password: string },
    callBack: () => void
  ) => void;
  signout: (callBack: () => void) => void;
}
