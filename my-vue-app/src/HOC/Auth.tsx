import { Navigate, useLocation } from "react-router-dom";
import { IChildren } from "../utility/types";
import { useAuth } from "../hook/useAuth";

const Auth = ({ children }: IChildren) => {
  const location = useLocation();
  // Uselocation позволяет вам получить сведения по текущему урлу
  // {
  // "pathname": "/posts",
  // "search": "",
  // "hash": "",
  // "state": null,
  // "key": "p2sotu2m"
  // }
  //

  const { isAuth } = useAuth() || {};
  if (!isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} />;
    // Помимо того что мы перенаравляем пользателя на логин старницу,
    // мы можем передать state который будет доступен через useLocation()
    // Это позволит нам вернуть пользователя на страницу "откуда он пришел или на которую он хотел зайти"
    // после логина
  }
  return children;
};
export default Auth;
