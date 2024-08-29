import React, { createContext, useState } from "react";
import { IAuthContext, User } from "../utility/types";

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [isAuth, setIsAuth] = useState({
    email: "",
    password: "",
  });

  const signin = (auth: User, callBack: () => void) => {
    setIsAuth(auth);
    callBack();
  };
  const signout = (callBack: () => void) => {
    setIsAuth({
      email: "",
      password: "",
    });
    callBack();
  };
  const value = { isAuth, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
