import { IUser } from "../../utility/types";
import styles from "./Profile.module.scss";
import { ReactComponent as ArrowBottom } from "../../assets/profileArrow.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg";
import { ReactComponent as SignIn } from "../../assets/profile.svg";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../store/userSlice";

const Profile = () => {
  // const [firstName, lastName] = username.split(" ");
  const { isAuth, signout } = useAuth();

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const user = useSelector((state) => state.user.profile);

  const name = user ? user.username : "";

  const logOut = () => {
    signout(() => navigate("/", { replace: true }));
  };

  console.log(user);
  // console.log(name);
  console.log(isAuth);
  return isAuth.email ? (
    <div className={styles.user}>
      <div className={styles.user__avatar}>
        {/* {firstName.charAt(0).toUpperCase()}
        {lastName.charAt(0).toUpperCase()} */}
      </div>
      <div className={styles.user__name}>
        {/* <span>{firstName}</span>
        <span>{lastName}</span> */}
        <span>{name}</span>
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
