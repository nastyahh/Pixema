import { IUser } from "../../utility/types";
import styles from "./Profile.module.scss";
import { ReactComponent as ArrowBottom } from "../../assets/profileArrow.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg";
import { ReactComponent as SignIn } from "../../assets/profile.svg";
import { useAuth } from "../../hook/useAuth";

const Profile = ({ username }: IUser) => {
  const [firstName, lastName] = username.split(" ");
  const { isAuth, signout } = useAuth();

  return isAuth ? (
    <div className={styles.user}>
      <div className={styles.user__avatar}>
        {firstName.charAt(0).toUpperCase()}
        {lastName.charAt(0).toUpperCase()}
      </div>
      <div className={styles.user__name}>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
      <button>
        <ArrowBottom />
      </button>
      <div className={styles.user__menu}></div>
    </div>
  ) : (
    <div className={styles.user}>
      <div className={styles.user__avatar}>
        <SignIn />
      </div>
      <div className={styles.user__name}>
        <span>Sign In</span>
      </div>
      <button>
        <ArrowRight />
      </button>
      <div className={styles.user__menu}></div>
    </div>
  );
};

export default Profile;
