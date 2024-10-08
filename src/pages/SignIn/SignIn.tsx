import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser, getUserProfile } from "../../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { ReactComponent as Arrow } from "../../assets/arrow-prev.svg";
import { ThemeContext } from "../../Context/context";
import InputPassword from "../../ui-components/InputPassword/InputPassword";

const SignIn = () => {
  const { isDark } = useContext(ThemeContext);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();
  const navigate = useNavigate();
  const location = useLocation();

  const InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const fromPage =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/";

  const handleSignIn = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getUser(userLogin)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getUserProfile());
        navigate(fromPage);
      }
    });
  };

  return (
    <div className={styles.signIn__wrapper}>
      <form
        className={`${styles.signIn} ${isDark ? "" : styles.light}`}
        onSubmit={handleSignIn}
      >
        <Link to="/" className={styles.signIn_back}>
          <Arrow />
        </Link>
        <h3 className={styles.signIn__title}>Sign In</h3>
        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          value={userLogin.email}
          onChange={InputChange}
          placeholder="Your email"
        />
        <label htmlFor="">Password</label>
        <InputPassword value={userLogin.password} onChange={InputChange} />
        <Link className={styles.signIn__forgot} to={"/forgot-password"}>
          Forgot password?
        </Link>
        <button className={styles.signIn__btn} type="submit">
          Sign In
        </button>
        <p className={styles.signIn__registration}>
          Don’t have an account?
          <Link to="/sign-up" className={styles.signIn__registrationLink}>
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
