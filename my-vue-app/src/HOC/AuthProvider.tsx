import React, { createContext, useState } from "react";
import { IAuthContext } from "../utility/types";

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [isAuth, setIsAuth] = useState("");

  const signin = (auth: string, callBack: () => void) => {
    setIsAuth(auth);
    callBack();
  };
  const signout = (callBack: () => void) => {
    setIsAuth("");
    callBack();
  };
  const value = { isAuth, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
