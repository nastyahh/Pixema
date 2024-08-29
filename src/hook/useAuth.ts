import { useContext } from "react";
import { AuthContext } from "../HOC/AuthProvider";
import { IAuthContext } from "../utility/types";

export function useAuth() {
  return useContext(AuthContext) as IAuthContext;
}
