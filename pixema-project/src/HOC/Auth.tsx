import { Navigate, useLocation } from "react-router-dom";
import { IChildren } from "../utility/types";
import { useSelector } from "react-redux";

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

  const isLogged = useSelector((state) => state.user.isLogged);
  if (!isLogged) {
    return <Navigate to={"/sign-in"} state={{ from: location }} />;
    // Помимо того что мы перенаравляем пользателя на логин старницу,
    // мы можем передать state который будет доступен через useLocation()
    // Это позволит нам вернуть пользователя на страницу "откуда он пришел или на которую он хотел зайти"
    // после логина
  }
  return children;
};
export default Auth;
