import { Navigate, useLocation } from "react-router-dom";
import { IChildren } from "../utility/types";
import { useSelector } from "react-redux";

const Auth = ({ children }: IChildren) => {
  const location = useLocation();

  const isLogged = useSelector((state) => state.user.isLogged);
  console.log("auth", isLogged);
  if (!isLogged) {
    return <Navigate to={"/sign-in"} state={{ from: location }} />;
  }
  return children;
};
export default Auth;
