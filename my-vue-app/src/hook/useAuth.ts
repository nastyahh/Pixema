import { useContext } from "react";
import { AuthContext } from "../HOC/AuthProvider";
import { IAuthContext } from "../utility/types";

// вынесли вызов useContext в хук чтобы можно
// было удобно брать значения конекста
export function useAuth() {
  return useContext(AuthContext) as IAuthContext;
}
