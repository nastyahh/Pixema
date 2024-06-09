import { IUser } from "../../utility/types";
import styles from "./Profile.module.scss";
import { ReactComponent as ArrowBottom } from "../../assets/profileArrow.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg";
import { ReactComponent as SignIn } from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, getUserProfile, toggleIsLogged } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

const Profile = () => {
  // const [firstName, lastName] = username.split(" ");

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const isLogged = useSelector((state) => state.user.isLogged);

  const user = useSelector((state) => state.user.profile);

  const logOut = () => {
    dispatch(toggleIsLogged(false));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [isLogged]);

  console.log(user);
  // console.log(isLogged);
  return isLogged ? (
    <div className={styles.user}>
      <div className={styles.user__avatar}></div>
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
