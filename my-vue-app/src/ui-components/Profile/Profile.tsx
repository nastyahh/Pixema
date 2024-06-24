import styles from "./Profile.module.scss";
import { ReactComponent as ArrowBottom } from "../../assets/profileArrow.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg";
import { ReactComponent as SignIn } from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile, toggleIsLogged } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { State } from "../../utility/types";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const isLogged = useSelector((state: State) => state.user.isLogged);

  const user = useSelector((state: State) => state.user.profile);

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

  // useEffect(() => {
  //   if (isLogged) {
  //     dispatch(getUserProfile());
  //   }
  // }, [isLogged]);

  return isLogged ? (
    <div className={styles.user}>
      <div className={styles.user__avatar}>
        {user ? getInitials(user.username) : "loading"}
      </div>
      <div className={styles.user__name}>
        <span>{user ? user.username : "loading"}</span>
      </div>
      <button>
        <ArrowBottom />
      </button>
      <div className={styles.user__menu}></div>
      <button onClick={logOut}>logOut</button>
    </div>
  ) : (
    <div className={styles.user}>
      <div className={styles.user__avatar}>
        <SignIn />
      </div>
      <div className={styles.user__name}>
        <span>Sign In</span>
      </div>
      <button onClick={() => navigate("/sign-in")}>
        <ArrowRight />
      </button>
      <div className={styles.user__menu}></div>
    </div>
  );
};

export default Profile;
