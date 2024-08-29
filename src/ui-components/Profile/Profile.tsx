import styles from "./Profile.module.scss";
import { ReactComponent as ArrowBottom } from "../../assets/arrow-bottom.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg";
import { ReactComponent as SignIn } from "../../assets/profile.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { toggleIsLogged } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { IMenu, State } from "../../utility/types";
import { ThemeContext } from "../../Context/context";

const Profile = ({ className }: IMenu) => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const isLogged = useSelector((state: State) => state.user.isLogged);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state: State) => state.user.profile);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getInitials = (username: string) => {
    if (!username) return "";
    const [firstName, lastName] = username.split("_");
    const initials = `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
    return initials;
  };

  const logOut = () => {
    dispatch(toggleIsLogged(false));
    localStorage.removeItem("Login");
  };

  return isLogged ? (
    <div
      className={`${styles.user} ${className} ${isDark ? "" : styles.light}`}
      onClick={toggleMenu}
    >
      <div className={styles.user__profile}>
        <div className={styles.user__avatar}>
          {user ? getInitials(user.username) : "loading"}
        </div>
        <div className={styles.user__name}>
          <span>{user ? user.username : "loading"}</span>
        </div>
      </div>
      <button className={styles.user__btnBottom}>
        <ArrowBottom />
      </button>
      <div
        className={`${styles.user__menu} ${menuOpen ? styles.open : ""}`}
        onMouseOver={() => setMenuOpen(true)}
        onMouseOut={() => setMenuOpen(false)}
      >
        <div className={styles.user__menu__edit}>
          <Link to="/settings" className={styles.user__menuLink}>
            Edit profile
          </Link>
        </div>
        <button onClick={logOut} className={styles.user__logOut}>
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={() => {
        navigate("/sign-in");
      }}
      className={`${styles.user} ${className}  ${isDark ? "" : styles.light}`}
    >
      <div className={styles.user__avatar}>
        <SignIn />
      </div>
      <div className={styles.user__name}>
        <span>Sign In</span>
      </div>
      <button className={styles.arrowRight}>
        <ArrowRight />
      </button>
      <div className={styles.user__menu}></div>
    </button>
  );
};

export default Profile;
